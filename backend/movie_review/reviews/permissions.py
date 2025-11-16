from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    SAFE_METHODS allowed for everyone.
    For unsafe methods, only the object's owner or a user with role=='admin' may modify.
    """
    def has_permission(self, request, view):
        # Allow list/retrieve/create to authenticated or anonymous depending on your app.
        # We'll allow anyone to read; creating requires authentication.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Creating requires authentication
        if request.method == 'POST':
            return request.user and request.user.is_authenticated
        # For other methods, we'll check object-level permission
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # Owner or admin allowed
        if not request.user or request.user.is_anonymous:
            return False
        if getattr(request.user, "role", None) == "admin":
            return True
        return obj.user == request.user
