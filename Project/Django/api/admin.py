from django.contrib import admin
from . models import *

# Register your models here.


@admin.register(StudentUser)
class StudentUserAdmin(admin.ModelAdmin):
    list_display = ['id','fullname','studentid','email','cgpa','completedcredit','department','password', 'gender','website','github','linkedin','bio','image','company','position','alumni','report']

@admin.register(FacultyUser)
class FacultyUserAdmin(admin.ModelAdmin):
    list_display = ['id','fullname','email','department','facultytype','password', 'gender','website','github','linkedin','bio','image']

@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ['id','username','password','department','image']

@admin.register(PostedJob)
class PostedJobAdmin(admin.ModelAdmin):
    list_display = ['id','jobtitle','sitelink','description','username','usertype', 'userposition','userid','datetime','userimage','department','image']


@admin.register(Recruitment)
class RecruitmentAdmin(admin.ModelAdmin):
    list_display = ['id','type','credit','cgpa','point','trimester', 'department','deadline','description']



@admin.register(FacultyApplication)
class FacultyApplicationAdmin(admin.ModelAdmin):
    list_display = ['id', 'fname', 'femail', 'fimage', 'aid', 'aname', 'aimage', 'coursename', 'courseid', 'department', 'section', 'day', 'classtime', 'trimester', 'type', 'did']


@admin.register(StudentApplication)
class StudentApplicationAdmin(admin.ModelAdmin):
    list_display = ['id', 'sid', 'sname', 'simage', 'sstudentid', 'credit','cgpa','point','experience', 'aemail', 'aname', 'aimage', 'coursename', 'courseid', 'department', 'section', 'day', 'classtime', 'trimester', 'type', 'rid', 'rname', 'rimage' ,'did','dname','dimage']


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ['id', 'sid', 'sname', 'simage', 'said', 'coursename', 'courseid', 'department', 'section', 'trimester', 'type', 'fid', 'messege']


@admin.register(Association)
class AssociationAdmin(admin.ModelAdmin):
    list_display = ['id', 'sid', 'sname', 'simage', 'said', 'coursename', 'courseid', 'department', 'section', 'trimester', 'type', 'femail', 'fname', 'fimage', 'faid']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'tid', 'department', 'type', 'postdate', 'deadline', 'title', 'instruction', 'assessment','status']


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'subid', 'department', 'type', 'subdate', 'subcomment', 'subfile', 'feddate', 'fedcomment', 'status']


@admin.register(Skills)
class SkillsAdmin(admin.ModelAdmin):
    list_display = ['id', 'userid', 'skillname']

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ['id', 'userid', 'company', 'position', 'postdate']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'date', 'time', 'department' ,'image']

@admin.register(Message)
class MessegeAdmin(admin.ModelAdmin):
    list_display = ['id', 'sender', 'receiver', 'type' ,'msg', 'time', 'file']


@admin.register(MyInteraction)
class MyInteractionAdmin(admin.ModelAdmin):
    list_display = ['id', 'aluid', 'aluname', 'aluimage', 'myid', 'myname', 'myimage', 'mytype', 'company', 'position']


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['id', 'reporterid', 'reportername', 'reporterimage' ,'reportedid', 'reportedname', 'reportedimage', 'messege', 'status']

@admin.register(Notices)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['id','notice','type']

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'image' ,'notification','userid' ,'usertype']