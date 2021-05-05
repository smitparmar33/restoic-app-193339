from django_filters.rest_framework import filterset, filters
from home.models import Favorite, HistoryRecord, QuickLink


class FavoriteFilter(filterset.FilterSet):

    class Meta:
        model = Favorite
        fields = ('track', 'user')

class HistoryFilter(filterset.FilterSet):

    class Meta:
        model = HistoryRecord
        fields = ('track', 'user', 'is_finished')

class QuickLinkFilter(filterset.FilterSet):

    class Meta:
        model = QuickLink
        fields = ('created', 'in_app')