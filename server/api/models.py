from __future__ import unicode_literals
from django.db import models
from django.core.cache import cache

from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class ApplicationURL(models.Model):
    username = models.CharField(max_length=100, unique=True)
    url = models.URLField()

    class Meta:
        app_label = 'api'
        verbose_name = "JIRA application URL"
        verbose_name_plural = "JIRA applications URL"

    def __str__(self):
        return self.url

    @staticmethod
    def get_url(username):
        url = cache.get(username+'_url')
        if not url:
            user = ApplicationURL.objects.get(username=username)
            url = user.url
            cache.set(username+'_url', url)
        return url
