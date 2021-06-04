from rest_framework import routers
from . views import CurrencyViewSet, TransactionViewSet, UserViewSet


router = routers.SimpleRouter()
router.register(r'currencies', CurrencyViewSet)
router.register(r'transactions', TransactionViewSet, basename="transaction")
router.register(r'me', UserViewSet, basename="me")

urlpatterns = router.urls