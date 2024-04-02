from rest_framework import serializers
from . models import *
class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = "__all__"

class FacultyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyUser
        fields = "__all__"

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = "__all__"

class PostedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostedJob
        fields = "__all__"

class RecruitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruitment
        fields = "__all__"


class FacultyApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyApplication
        fields = "__all__"

class StudentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        fields = "__all__"

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = "__all__"


class AssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Association
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = "__all__"


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = "__all__"

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class MyInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyInteraction
        fields = "__all__"

class MessegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"

class NoticesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notices
        fields = "__all__"

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"