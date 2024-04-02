from django.db import models
from django.utils import timezone

class StudentUser(models.Model):
    fullname = models.CharField(max_length=100)
    studentid = models.CharField(max_length=100) 
    email = models.CharField(max_length=100) 
    cgpa = models.CharField(max_length=100)
    completedcredit = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    gender = models.CharField(max_length=100, blank=True)
    website = models.CharField(max_length=200, blank=True)
    github = models.CharField(max_length=200, blank=True)
    linkedin = models.CharField(max_length=200, blank=True)
    bio = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='uploads', default='uploads/noimage.png',blank=True)
    company = models.CharField(max_length=200, blank=True)
    position = models.CharField(max_length=200, blank=True)
    alumni = models.IntegerField(default=0)
    report = models.IntegerField(default=0)

class FacultyUser(models.Model):
    fullname = models.CharField(max_length=100)
    email = models.CharField(max_length=100) 
    department = models.CharField(max_length=100)
    facultytype = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    gender = models.CharField(max_length=100, blank=True)
    website = models.CharField(max_length=200, blank=True)
    github = models.CharField(max_length=200, blank=True)
    linkedin = models.CharField(max_length=200, blank=True)
    bio = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='uploads', default='uploads/noimage.png', blank=True)

class AdminUser(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    image = models.ImageField(upload_to='uploads',blank=True)

class PostedJob(models.Model):
    jobtitle = models.CharField(max_length=100)
    sitelink = models.CharField(max_length=200, blank=True) 
    description = models.TextField()
    username = models.CharField(max_length=100)
    usertype = models.CharField(max_length=100)
    userposition = models.CharField(max_length=100)
    userid = models.IntegerField()
    datetime = models.DateTimeField(default=timezone.now)
    userimage = models.CharField(max_length=100,blank=True)
    department = models.CharField(max_length=100)
    image = models.ImageField(upload_to='uploads', default='uploads/job.png',blank=True)

class Recruitment(models.Model):
    type = models.CharField(max_length=100)
    credit = models.CharField(max_length=100)
    cgpa = models.CharField(max_length=100)
    point = models.CharField(max_length=100)
    trimester = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    deadline = models.DateField(max_length=100)
    description = models.CharField(max_length=100)


class FacultyApplication(models.Model):
    fname = models.CharField(max_length=100,blank=True)
    femail = models.CharField(max_length=100,blank=True)
    fimage = models.CharField(max_length=100,blank=True)
    aid = models.IntegerField(default=0)
    aname = models.CharField(max_length=100,blank=True)
    aimage = models.CharField(max_length=100,blank=True)
    coursename = models.CharField(max_length=100)
    courseid = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    day = models.CharField(max_length=100)
    classtime = models.CharField(max_length=100)
    trimester = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    did = models.IntegerField(default=0)


class StudentApplication(models.Model):
    sid = models.IntegerField(default=0)
    sname = models.CharField(max_length=100,blank=True)
    simage = models.CharField(max_length=100,blank=True)
    sstudentid = models.CharField(max_length=100)
    credit = models.CharField(max_length=100,blank=True)
    cgpa = models.CharField(max_length=100,blank=True)
    point = models.CharField(max_length=100,blank=True)
    experience = models.CharField(max_length=100,blank=True)
    aemail = models.CharField(max_length=100,blank=True)
    aname = models.CharField(max_length=100,blank=True)
    aimage = models.CharField(max_length=100,default='')
    coursename = models.CharField(max_length=100)
    courseid = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    day = models.CharField(max_length=100)
    classtime = models.CharField(max_length=100)
    trimester = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    rid = models.IntegerField(default=0)
    rname = models.CharField(max_length=100,blank=True)
    rimage = models.CharField(max_length=100,blank=True)
    did = models.IntegerField(default=0)
    dname = models.CharField(max_length=100,blank=True)
    dimage = models.CharField(max_length=100,blank=True)


class Recommendation(models.Model):
    sid = models.IntegerField()
    sname = models.CharField(max_length=100,blank=True)
    simage = models.CharField(max_length=100,blank=True)
    said = models.IntegerField()
    coursename = models.CharField(max_length=100)
    courseid = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    trimester = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    fid = models.IntegerField()
    messege = models.TextField()

    
class Association(models.Model):
    sid = models.IntegerField()
    sname = models.CharField(max_length=100)
    simage = models.CharField(max_length=100)
    said = models.IntegerField()
    coursename = models.CharField(max_length=100)
    courseid = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    trimester = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    femail = models.CharField(max_length=100,default='')
    fname = models.CharField(max_length=100)
    fimage = models.CharField(max_length=100)
    faid = models.IntegerField(default=0)


class Task(models.Model):
    tid = models.IntegerField()
    department = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    postdate = models.CharField(max_length=100)
    deadline = models.DateField(max_length=100,blank=True,null=True)
    title = models.CharField(max_length=100)
    instruction = models.TextField()
    assessment = models.FileField(upload_to='uploads',blank=True, default='')
    status = models.CharField(max_length=100,blank=True, default='')

class Submission(models.Model):
    subid = models.IntegerField()
    department = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    subdate = models.CharField(max_length=100)
    subcomment = models.TextField(default='')
    subfile = models.FileField(upload_to='uploads',blank=True)
    feddate = models.CharField(max_length=100,default='')
    fedcomment = models.TextField(default='')
    status = models.CharField(max_length=100)

class Skills(models.Model):
    userid = models.IntegerField()
    skillname = models.CharField(max_length=100)

class Career(models.Model):
    userid = models.IntegerField()
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    postdate = models.CharField(max_length=100)

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    department = models.CharField(max_length=100)
    image = models.ImageField(upload_to='uploads')


class MyInteraction(models.Model):
    aluid = models.IntegerField()
    aluname = models.CharField(max_length=100)
    aluimage = models.CharField(max_length=100)
    myid = models.IntegerField()
    myname = models.CharField(max_length=100)
    myimage = models.CharField(max_length=100)
    mytype = models.CharField(max_length=100)
    company = models.CharField(max_length=100,blank = True)
    position = models.CharField(max_length=100,blank = True)

class Message(models.Model):
    sender = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default='')
    receiver = models.CharField(max_length=100)
    msg = models.TextField(blank=True)
    time = models.CharField(max_length=100)
    file = models.FileField(upload_to='uploads', blank=True)

class Report(models.Model):
    reporterid = models.CharField(max_length=100)
    reportername = models.CharField(max_length=100)
    reporterimage = models.CharField(max_length=100)
    reportedid = models.CharField(max_length=100)
    reportedname = models.CharField(max_length=100)
    reportedimage = models.CharField(max_length=100)
    messege = models.TextField()
    status = models.CharField(max_length=100,blank=True)

class Notices(models.Model):
    type = models.CharField(max_length=100)
    notice = models.CharField(max_length=100)

class Notification(models.Model):
    image = models.CharField(max_length=100)
    notification = models.CharField(max_length=100)
    userid = models.CharField(max_length=100)
    usertype = models.CharField(max_length=100)