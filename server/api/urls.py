from django.conf.urls import url, include
from rest_framework import routers

from . import views

# router = routers.DefaultRouter()
# #router.register(r'client', views.ViewSet)

# urlpatterns = [
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
#     url(r'^', include(router.urls)),
# ]

urlpatterns = [
    url(r'^(?P<project_id>[\w]+)/data', views.project_statistics, name='Project Statistics'),
    url(r'^', views.index, name='index'),
]
