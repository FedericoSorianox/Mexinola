from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"mensaje": "¡API funcionando correctamente!"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root),
    path('', include('productos.urls')),
] 