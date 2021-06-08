from rest_framework import serializers

from .models import Currency, Transaction, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name',]
        read_only_fields = ['id','username','first_name','last_name',]


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','balance','email']
        read_only_fields = ['id','balance']

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'
        

class TransactionSerializer(serializers.ModelSerializer):
    user_from = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
        )
    sender = UserSerializer(source="user_from", read_only=True)
    receiver = UserSerializer(source="user_to",  read_only=True)
    currency = CurrencySerializer(source="currency_id", read_only=True)
    
    def validate(self, attrs):
        balance = attrs['user_from'].balance
        if attrs['amount'] > balance:
            raise serializers.ValidationError({"amount": f'Transfer amount must be less than available balance {balance:.2f}.'})
        if attrs['amount'] <= 0:
            raise serializers.ValidationError({"amount": f'Transfer amount must be more than zero.'})
        return attrs
        
    class Meta:
        model = Transaction
        fields = [
            'id',
            'user_from', 'sender',
            'user_to', 'receiver',
            'amount',
            'currency_id', 'currency',
            'datetime',
        ]
