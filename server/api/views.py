from django.shortcuts import render
from django.http import HttpResponse, Http404

from jira import JIRA
import json
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
from models import ApplicationURL

APPLICATION_URL = 'http://gale43.atlassian.net'
JIRA_USERNAME = 'vikas.lamba'
JIRA_PASSWORD = 'vky@gale16'


@csrf_exempt
def index(request):

    if request.method == "POST":
        application_url = request.POST.get('application_url')
        username = request.POST.get('username')
        password = request.POST.get('password')

    is_setting_up = False
    if all([application_url, username, password]):
        is_setting_up = True
    elif all([username, password]):
        try:
            application_url = ApplicationURL.get_url(username)
        except ApplicationURL.DoesNotExist:
            raise Http404

    jira = JIRA(server=application_url, basic_auth=(username, password))
    cache_time_to_live = 1000 # Seconds
    cache.set(username, jira, cache_time_to_live)
    available_projects = jira.projects()

    if is_setting_up:
        application_url_obj, created = ApplicationURL.objects.get_or_create(username=username)
        # if created:
        application_url_obj.url = application_url
        application_url_obj.save()
    data = []
    for project in available_projects:
        project_data = {
            'id': project.id,
            'name': project.name,
        }
        data.append(project_data)
    data = json.dumps(data)
    return HttpResponse(data)

def project_statistics(request, project_id):

    user_name = request.GET.get('username')
    if user_name is None:
        raise Http404
    jira = cache.get(user_name)
    if not jira: 
        raise Http404
        # return HttpResponse('Login required')
        # jira = JIRA(server=APPLICATION_URL, basic_auth=(JIRA_USERNAME, JIRA_PASSWORD))

    jira._session.max_retries = 3
    project = jira.project(str(project_id))
    versions = []
    for version in project.versions:
        if 'releaseDate' in version.raw:
            release_date = version.releaseDate
        else:
            release_date = None
        versiod_data = {
            'name': version.name,
            'release_date': release_date,
        }
        versions.append(versiod_data)

    issues = jira.search_issues('project='+str(project_id))

    issues_list = []
    users = {}
    total_issues = len(issues)
    total_resolved = 0
    total_unresolved = 0

    for issue in issues:
        user = issue.fields.assignee
        if user is not None:
            user_key = user.key
            user_name = user.name
        else:
            user_key = None
            user_name = None
        issue_data = {
            'id': issue.id,
            'key': issue.key,
            'assigne': {
                'key': user_key,
                'name': user_name,
            },
            'created': issue.fields.created,
            'status': issue.fields.status.name,
        }
        if user_key in users:
            if 'Delivered' in issue.fields.status.name:
                users[user_key]['resolved'] += 1
                total_resolved += 1
            else:
                users[user_key]['unresolved'] += 1
                total_unresolved += 1
        else:
            user_data = {
                'name': user_name,
                'resolved': 0,
                'unresolved': 0,
            }
            if 'Delivered' in issue.fields.status.name or 'Resolved' in issue.fields.status.name:
                user_data['resolved'] += 1
                total_resolved += 1
            else:
                user_data['unresolved'] += 1
                total_unresolved += 1
            users[user_key] = user_data

        issues_list.append(issue_data)

    issues_data = {
        'total': total_issues,
        'resolved': total_resolved,
        'unresolved': total_unresolved,
        'issues': issues_list,
    }

    data = {
        'issues_data': issues_data,
        'user_data': users,
        'project_verions': versions,
    }
    data = json.dumps([data])
    return HttpResponse(data)
