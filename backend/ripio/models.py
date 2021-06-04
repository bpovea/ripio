from django.db import models
from django.conf import settings

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)


class Currency(models.Model):
    code = models.CharField(max_length=3)
    name = models.CharField(max_length=10)
    prefix = models.CharField(max_length=1)
    
    def __str__(self):
        return "(%s) %s" % (self.code,self.name)
    
    
class Transaction(models.Model):
    user_from = models.ForeignKey(User,
                                  on_delete=models.RESTRICT, related_name="transactions_user_from")
    user_to = models.ForeignKey(User,
                                  on_delete=models.RESTRICT, related_name="transanctions_user_to")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency_id = models.ForeignKey(Currency,
                                    on_delete=models.RESTRICT)
    datetime = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        r = super().save(*args, **kwargs)
        self.user_from.balance -= self.amount
        self.user_from.save()
        self.user_to.balance += self.amount
        self.user_to.save()
        return r
    


