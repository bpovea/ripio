from rest_framework import routers
from . views import CurrencyViewSet, TransactionViewSet, UserViewSet, UsersViewSet


router = routers.SimpleRouter()
router.register(r'currencies', CurrencyViewSet)
router.register(r'transactions', TransactionViewSet, basename="transaction")
router.register(r'users', UsersViewSet, basename="user")
router.register(r'me', UserViewSet, basename="me")

urlpatterns = router.urls