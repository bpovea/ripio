from django.db.models import Q

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import User, Currency, Transaction
from .serializers import (
    MeSerializer,
    UserSerializer,
    CurrencySerializer,
    TransactionSerializer)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = MeSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return [self.request.user]


class CurrencyViewSet(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()
    
    
class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        queryset = []
        user = self.request.user
        try:
            queryset = Transaction.objects.filter(Q(user_from = user) | \
                                                  Q(user_to = user)) \
                                        .order_by('datetime')
        except: pass
        return queryset
    