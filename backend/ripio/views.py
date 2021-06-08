from django.db.models import Q

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Currency, Transaction
from .serializers import (
    MeSerializer,
    CurrencySerializer,
    TransactionSerializer)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = MeSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return [self.request.user]
    
    def update(self, request):
        user = request.user
        serializer = MeSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = MeSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return User.objects.filter(~Q(id=self.request.user.id))


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
    
    def post(self,request):
        breakpoint()
        return super().post(request)
    