from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.utils import timezone
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
import csv

from rest_framework.parsers import MultiPartParser, FormParser

class StudentUserAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            instance = StudentUser.objects.get(pk=pk)
            serializer = StudentUserSerializer(instance)
        else:
            queryset = StudentUser.objects.all()
            serializer = StudentUserSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        instance = StudentUser.objects.get(pk=pk)
        serializer = StudentUserSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        instance = StudentUser.objects.get(pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class FacultyUserAPIView(APIView):
    
    def get(self, request, pk=None):
        if pk:
            instance = FacultyUser.objects.get(pk=pk)
            serializer = FacultyUserSerializer(instance)
        else:
            queryset = FacultyUser.objects.all()
            serializer = FacultyUserSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FacultyUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        instance = FacultyUser.objects.get(pk=pk)
        serializer = FacultyUserSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        instance = FacultyUser.objects.get(pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AdminUserAPIView(APIView):
    def get(self, request):
        queryset = AdminUser.objects.all()
        serializer = AdminUserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    
class PostedJobAPIView(APIView):
    
    def get(self, request, pk=None):
        if pk:
            instance = PostedJob.objects.get(pk=pk)
            serializer = PostedJobSerializer(instance)
        else:
            queryset = PostedJob.objects.all().order_by('-datetime')
            serializer = PostedJobSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostedJobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        instance = PostedJob.objects.get(pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class DepartmentPostedJobAPIView(APIView):
    def get(self, request, department):
        query = PostedJob.objects.filter(department=department).order_by('-datetime')
        serializer = PostedJobSerializer(query, many=True)
        return Response(serializer.data)
    
class MyPostedJobAPIView(APIView):
    def get(self, request, userid):
        query = PostedJob.objects.filter(userid=userid).order_by('-datetime')
        serializer = PostedJobSerializer(query, many=True)
        return Response(serializer.data)
    
class UpdatePostedJobAPIView(APIView):
    def post(self,request):
        try:
            data = request.data
            obj = PostedJob.objects.get(id=data['id'])
            obj.jobtitle = data['jobtitle']
            obj.sitelink = data['sitelink']
            obj.description = data['description']
            if(data['image']):
                obj.image = data['image']
            obj.userposition = data['userposition']
            obj.username = data['username']
            obj.userimage = data['userimage']
            obj.department = data['department']
            obj.datetime = timezone.now()
            obj.save()
            return Response("data updated successfully")
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class RecruitmentAPIView(APIView):
    def post(self, request):
        data = request.data

        try:
            Recruitment.objects.create(
                type=data['type'],
                credit=data['credit'],
                cgpa=data['cgpa'],
                point=data['point'],
                trimester=data['trimester'],
                department=data['department'],
                deadline=data['deadline'],
                description=data['description'],

            )
            reader = csv.reader(data['file'].read().decode('utf-8').splitlines())
            for row in reader:
                print(row)
                instance = FacultyUser.objects.get(email=row[4])
                FacultyApplication.objects.create(
                    coursename = row[0],
                    courseid = row[1],
                    section = row[2],
                    classtime = row[3],
                    femail = instance.email,
                    fname = instance.fullname,
                    fimage = instance.image,
                    day = row[5],
                    department = data['department'],
                    type = data['type'],
                    trimester=data['trimester'],
                )
            Notices.objects.create(
                type = "recruitment",
                notice = "From Department of "+data['department']+" "+data['type']+" is currently recruiting"
            )
            return Response("Connectiong successfull")
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    
    def delete(self, request, pk):
        instance = Recruitment.objects.get(pk=pk)
        FacultyApplication.objects.filter(department=instance.department, type=instance.type).delete()
        StudentApplication.objects.filter(department=instance.department, type=instance.type).delete()
        Association.objects.filter(department=instance.department, type=instance.type).delete()
        Task.objects.filter(department=instance.department, type=instance.type).delete()
        Submission.objects.filter(department=instance.department, type=instance.type).delete()
        Recommendation.objects.filter(department=instance.department, type=instance.type).delete()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class RecruitmentDeptAPIView(APIView):
    def get(self, request,department):
        queryset = Recruitment.objects.filter(department=department)
        serializer = RecruitmentSerializer(queryset, many=True)
        return Response(serializer.data)

class RecruitmentShowAPIView(APIView):
    def get(self, request,type):
        if type:
            queryset = Recruitment.objects.filter(type=type)
            serializer = RecruitmentSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Check your data again!")

    
class FacultyApplicationAPIView(APIView):
    def get(self, request):
        queryset = FacultyApplication.objects.all()
        serializer = FacultyApplicationSerializer(queryset, many=True)
        return Response(serializer.data)
        
class FacultyApplicationDeptAPIView(APIView):
    def get(self, request, department):
        if department:
            queryset = FacultyApplication.objects.filter(department=department).order_by('aname')
            serializer = FacultyApplicationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Check sending data again")
        
class StudentApplicationDeptAPIView(APIView):
    def get(self, request, department):
        if department:
            queryset = StudentApplication.objects.filter(department=department).order_by('aname')
            serializer = StudentApplicationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Check sending data again")
        

class MyFacultyApplicationAPIView(APIView):
    def get(self, request, email):
        if email:
            queryset = FacultyApplication.objects.filter(femail=email).order_by('-aid', 'id')
            serializer = FacultyApplicationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("email not found")
        

class MyStudentApplicationAPIView(APIView):
    def get(self, request, sid):
        if sid:
            queryset = StudentApplication.objects.filter(sid=sid).order_by('aemail')
            serializer = StudentApplicationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("email not found")


class FacultySearchAPIView(APIView):
    def get(self, request, fullname):
        if fullname:
            names = FacultyUser.objects.filter(fullname__icontains=fullname)
            serializer = FacultyUserSerializer(names, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")


class CourseSearchAPIView(APIView):
    def get(self, request, coursename):
        if coursename:
            courses = FacultyApplication.objects.filter(coursename__icontains=coursename)
            serializer = FacultyApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")
        
class SectionSearchAPIView(APIView):
    def get(self, request, coursename,courseid,department,type):
        if coursename and courseid and department and type:
            courses = FacultyApplication.objects.filter(Q(coursename=coursename) & Q(courseid=courseid) & Q(department=department) & Q(type=type))
            serializer = FacultyApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")

        
class FacultyApplyAPIView(APIView):
    def get(self, request, department,type,trimester):
        if department and type and trimester:
            courses = FacultyApplication.objects.filter(Q(department=department) & Q(type=type) & Q(trimester=trimester))
            serializer = FacultyApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Sending")
        

class StudentApplyAPIView(APIView):
    def get(self, request, department,type):
        if department and type:
            courses = StudentApplication.objects.filter(Q(department=department) & Q(type=type))
            serializer = StudentApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Sending")



class FacultyCreateApplicationAPIView(APIView):
    def post(self,request):
        data = request.data
        try:
            obj = FacultyUser.objects.get(id=data['fid'])
            FacultyApplication.objects.create(
                coursename = data['coursename'],
                courseid = data['courseid'],
                section = data['section'],
                classtime = data['classtime'],
                femail = obj.email,
                fname = obj.fullname,
                fimage = obj.image,
                day = data['day'],
                department = data['department'],
                type = data['type'],
                trimester=data['trimester'],
            )
            return Response("Connectiong successfull")
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class StudentCreateApplicationAPIView(APIView):
    def post(self,request):
        data = request.data
        try:
            obj = StudentUser.objects.get(id=data['sid'])
            StudentApplication.objects.create(
                coursename = data['coursename'],
                courseid = data['courseid'],
                section = data['section'],
                classtime = data['classtime'],
                sid = data['sid'],
                credit = obj.completedcredit,
                cgpa = obj.cgpa,
                point = data['point'],
                experience = data['experience'],
                sstudentid = obj.studentid,
                sname = obj.fullname,
                simage = obj.image,
                day = data['day'],
                department = data['department'],
                type = data['type'],
                trimester=data['trimester'],
            )
            return Response("Connectiong successfull")
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class StudentCreateRecommendationAPIView(APIView):
    def post(self,request):
        data = request.data
        try:
            student_obj = StudentUser.objects.get(id=data['sid'])
            application_obj = StudentApplication.objects.get(id=data['said'])
            faculty_obj = FacultyUser.objects.get(id=data['fid'])
            Recommendation.objects.create(
                sid = data['sid'],
                sname = student_obj.fullname,
                simage = student_obj.image,
                said = data['said'],
                coursename = application_obj.coursename,
                courseid = application_obj.courseid,
                department = application_obj.department,
                section = application_obj.section,
                type = application_obj.type,
                trimester=application_obj.trimester,
                fid=data['fid'],
                messege = data['messege'],
            )
            Notification.objects.create(
                    usertype = "faculty",
                    notification = student_obj.fullname +" asked for your recommendation",
                    userid = faculty_obj.email,
                    image = student_obj.image,
            )
            application_obj.did = data['fid']
            application_obj.dname = faculty_obj.fullname
            application_obj.dimage = faculty_obj.image
            application_obj.save()
            return Response("Connectiong successfull")
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class RecommendationAPIView(APIView):
    def get(self, request, fid):
        if fid:
            results = Recommendation.objects.filter(fid = fid)
            serializer = RecommendationSerializer(results, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Sending")


class RecommendationokAPIView(APIView):
    def get(self, request, aid,id):
        if aid and id:
            try:
                result = StudentApplication.objects.get(id = aid)
                result1 = Recommendation.objects.get(id = id)
                result.rid = result.did
                result.rname = result.dname
                result.rimage = result.dimage
                result1.fid = 0             
                Notification.objects.create(
                    usertype = "student",
                    notification = result.rname + " has recommended you for " + result.coursename + " section (" + result.section + ")",
                    userid = result.sid,
                    image = result.rimage,
                )
                result.save()
                result1.save()
                result1.delete()
                return Response("Updated")
            except:
                return Response("Updated")
        else:
            return Response("Not Sending")
        
class RecommendationcancelAPIView(APIView):
    def get(self, request, aid,id):
        if aid and id:
            try:
                result = StudentApplication.objects.get(id = aid)
                result1 = Recommendation.objects.get(id = id)
                Notification.objects.create(
                    usertype = "student",
                    notification = result.dname + " has cancelled your recommendation request for " + result.coursename + " section (" + result.section + ")",
                    userid = result.sid,
                    image = result.dimage,
                )
                result.did = 0
                result.dname = ''
                result.dimage = ''
                result1.fid = 0
                result.save()
                result1.save()
                result1.delete()
                return Response("Updated")
            except:
                return Response("Updated")
        else:
            return Response("Not Sending")
        

class RecommendationeditAPIView(APIView):
    def get(self, request, id):
        if id:
            try:
                result = StudentApplication.objects.get(id = id)
                result1 = Recommendation.objects.get(said = id)
                result.did = 0
                result.dname = ''
                result.dimage = ''
                result.save()
                result1.delete()
                return Response("Updated")
            except:
                return Response("Recommendation Deleted")
        else:
            return Response("Not Sending")
        

class StudentApplicationDeleteAPIView(APIView):
    def get(self, request, id):
        if id:
            try:
                result1 = Recommendation.objects.get(said=id)
                result1.delete()
            except ObjectDoesNotExist:
                pass

            result = StudentApplication.objects.get(id = id)
            result.delete()
            return Response("Updated")
        else:
            return Response("Not Sending")
        
class FacultyApplicationDeleteAPIView(APIView):
    def get(self, request, id):
        if id:
            result = FacultyApplication.objects.get(id = id)
            result.delete()
            return Response("Updated")
        else:
            return Response("Not Sending")
        

class StudentApplicationSearchAPIView(APIView):
    def get(self, request, name):
        if name:
            courses = StudentApplication.objects.filter(Q(sname__icontains=name) | Q(rname__icontains=name))
            serializer = StudentApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")
        

class FacultyApplicationSearchAPIView(APIView):
    def get(self, request, name):
        if name:
            courses = FacultyApplication.objects.filter(Q(fname__icontains=name) | Q(coursename__icontains=name) | Q(type__icontains=name))
            serializer = FacultyApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")
        

class StudentApplicationSelectAPIView(APIView):
    def get(self, request, id):
        if id:
            try:
                result = StudentApplication.objects.get(id = id)
                if result.aemail == "":
                    result1 = FacultyApplication.objects.get(department = result.department, type = result.type, coursename = result.coursename, courseid = result.courseid,section = result.section,day = result.day, classtime = result.classtime, trimester = result.trimester)
                    result1.aid = result.sid
                    result1.aname = result.sname
                    result1.aimage = result.simage
                    result.aemail = result1.femail
                    result.aname = result1.fname
                    result.aimage = result1.fimage
                    result.did = 0
                    result.dname = ''
                    result.dimage = ''
                    Association.objects.create(
                    sid = result.sid,
                    sname = result.sname,
                    simage = result.simage,
                    said = id,
                    coursename = result.coursename,
                    courseid = result.courseid,
                    department = result.department,
                    section = result.section,
                    type = result.type,
                    trimester= result.trimester,
                    femail= result1.femail,
                    fname = result1.fname,
                    fimage = result1.fimage,
                    faid = result1.id,
                    )
                    Notification.objects.create(
                        usertype = "student",
                        notification = "You have been selected for " + result.coursename + " section (" + result.section + ") as " + result.type,
                        userid = result.sid,
                        image = '',
                    )
                    Notification.objects.create(
                        usertype = "faculty",
                        notification = result.type +" has been associated for " + result.coursename + " section (" + result.section + ")",
                        userid = result1.femail,
                        image = '',
                    )
                    result.save()
                    result1.save()
                    try:
                        result2 = Recommendation.objects.get(said = id)
                        result2.delete()
                    except:
                        pass
                    return Response("Updated")
                else:
                    return Response("This Student Has Already Been Selected!")
            except ObjectDoesNotExist:
                return Response("Application No Longer Availabe!")
        else:
            return Response("Not Searching")
        

class StudentApplicationSelectInAPIView(APIView):
    def get(self, request, id):
        if id:
            try:
                result = StudentApplication.objects.get(id = id)
                result1 = FacultyApplication.objects.get(department = result.department, type = result.type, coursename = result.coursename, courseid = result.courseid,section = result.section,day = result.day, classtime = result.classtime, trimester = result.trimester)
                if result1.aid == 0:
                    result1.aid = result.sid
                    result1.aname = result.sname
                    result1.aimage = result.simage
                    result.aemail = result1.femail
                    result.aname = result1.fname
                    result.aimage = result1.fimage
                    result.did = 0
                    result.dname = ''
                    result.dimage = ''
                    Association.objects.create(
                    sid = result.sid,
                    sname = result.sname,
                    simage = result.simage,
                    said = id,
                    coursename = result.coursename,
                    courseid = result.courseid,
                    department = result.department,
                    section = result.section,
                    type = result.type,
                    trimester= result.trimester,
                    femail= result1.femail,
                    fname = result1.fname,
                    fimage = result1.fimage,
                    faid = result1.id,
                    )
                    Notification.objects.create(
                        usertype = "student",
                        notification = "You have been selected for " + result.coursename + " section (" + result.section + ") as " + result.type,
                        userid = result.sid,
                        image = '',
                    )
                    Notification.objects.create(
                        usertype = "faculty",
                        notification = result.type +" has been associated for " + result.coursename + " section (" + result.section + ")",
                        userid = result1.femail,
                        image = '',
                    )
                    result.save()
                    result1.save()
                    try:
                        result2 = Recommendation.objects.get(said = id)
                        result2.delete()
                    except:
                        pass
                    return Response("Updated")
                else:
                    return Response("The assistant has already been selected for this course!")
            except ObjectDoesNotExist:
                return Response("Application No Longer Availabe!")
        else:
            return Response("Not Searching")
        

class StudentApplicationViewAPIView(APIView):
    def get(self, request, id):
        if id:
            query = FacultyApplication.objects.get(id = id)
            courses = StudentApplication.objects.filter(Q(department=query.department) & Q(type=query.type) & Q(trimester=query.trimester) & Q(coursename=query.coursename)& Q(courseid=query.courseid)& Q(section=query.section)).order_by('-rid', 'experience', '-cgpa', '-credit')
            serializer = StudentApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")
        

class StudentApplicationSelectSearchAPIView(APIView):
    def get(self, request, id, name):
        if id and name:
            query = FacultyApplication.objects.get(id = id)
            courses = StudentApplication.objects.filter(Q(department=query.department) & Q(type=query.type) & Q(trimester=query.trimester) & Q(coursename=query.coursename)& Q(courseid=query.courseid)& Q(section=query.section)& Q(sname__icontains=name)).order_by('-rid', 'experience', '-cgpa', '-credit')
            serializer = StudentApplicationSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Not Searching")
        


class AssistantAPIView(APIView):
    def get(self, request,department,type):
        if department and type:
            queryset = Association.objects.filter(Q(department=department) & Q(type=type))
            serializer = AssociationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class FindAssistantAPIView(APIView):
    def get(self, request,department,type,coursename, courseid):
        if department and type and coursename and courseid:
            print(department,type,coursename,courseid)
            queryset = Association.objects.filter(Q(department=department) & Q(type=type) & Q(coursename=coursename) & Q(courseid=courseid))
            serializer = AssociationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class AssistantSearchAPIView(APIView):
    def get(self, request,department,type,name):
        if department and type:
            queryset = Association.objects.filter(Q(department=department) & Q(type=type)& Q(sname__icontains=name))
            serializer = AssociationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class AssistantRemoveAPIView(APIView):
    def get(self, request,id):
        if id:
            queryset = Association.objects.get(id = id)
            try:
                sapp = StudentApplication.objects.get(id = queryset.said)
                fapp = FacultyApplication.objects.get(id = queryset.faid)
                sapp.aemail = ''
                sapp.aname = ''
                sapp.aimage = ''
                fapp.aid = 0
                fapp.aname = ''
                fapp.aimage = ''
                sapp.save()
                fapp.save()
                Task.objects.filter(department=queryset.department, type=queryset.type).delete()
                Submission.objects.filter(department=queryset.department, type=queryset.type).delete()
                try:
                    result2 = Recommendation.objects.get(said = queryset.said)
                    result2.delete()
                except:
                    pass
            except:
                pass
            queryset.delete()
            return Response("Association Removed!")
        else:
            return Response("Not Looking")
        

class MyAssociationAPIView(APIView):
    def get(self, request,id):
        if id:
            queryset = Association.objects.filter(sid = id)
            serializer = AssociationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class MyAssociationFacultyAPIView(APIView):
    def get(self, request,email):
        if email:
            queryset = Association.objects.filter(femail = email)
            serializer = AssociationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        


class CreateTaskAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            obj = Association.objects.get(id = data['tid'])
            if data['deadline']:
                Task.objects.create(
                    title = data['title'],
                    instruction = data['instruction'],
                    department = data['department'],
                    type = data['type'],
                    tid = data['tid'],
                    postdate = data['postdate'],
                    assessment = data['file'],
                    deadline = data['deadline'],
                    status = "recently"
                ) 
            else:
                Task.objects.create(
                    title = data['title'],
                    instruction = data['instruction'],
                    department = data['department'],
                    type = data['type'],
                    tid = data['tid'],
                    postdate = data['postdate'],
                    assessment = data['file'],
                    status = "recently"
            )
            Notification.objects.create(
                usertype = "student",
                notification = "A new task has been assigned for " + obj.coursename + " section (" + obj.section + ")",
                userid = obj.sid,
                image = obj.fimage,
            )      
            return Response("Connectiong successfull")
        else:
            return Response("Data is not sending")


        

class TaskViewAPIView(APIView):
    def get(self, request,tid,status):
        if tid and status:
            queryset = Task.objects.filter(Q(tid = tid)& Q(status = status)).order_by('-id')
            serializer = TaskSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class UpdateTaskAPIView(APIView):
    def post(self,request):
        data = request.data
        try:
            obj = Task.objects.get(id = data['id'])       
            obj.title = data['title']
            obj.instruction = data['instruction']
            obj.postdate = data['postdate']
            if data['file']:
                obj.assessment = data['file']
            if data['deadline']:
                obj.deadline = data['deadline']
            obj.save()
            return Response("Connectiong successfull")
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class TaskDeleteViewAPIView(APIView):
    def get(self, id):
        if id:
            queryset = Task.objects.get(id = id)
            queryset.delete()
            return Response("Deleted")
        else:
            return Response("Not Looking")
        

class TaskDeleteAPIView(APIView):
    def get(self, request, id):
        if id:
            result = Task.objects.get(id = id)
            result.delete()
            try:
                Submission.objects.filter(subid = id).delete()
            except:
                pass
            return Response("Updated")
        else:
            return Response("Not Sending")
        

class SubViewAPIView(APIView):
    def get(self, request,id):
        if id:
            queryset = Submission.objects.filter(subid = id).order_by('-id')
            serializer = SubmissionSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class CreateSubAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            if data['file']:
                Submission.objects.create(
                    subid = data['subid'],
                    subcomment = data['subcomment'],
                    department = data['department'],
                    type = data['type'],
                    subdate = data['subdate'],
                    subfile = data['file'],
                    status = "In Progress"
                ) 
            else:
                Submission.objects.create(
                    subid = data['subid'],
                    subcomment = data['subcomment'],
                    department = data['department'],
                    type = data['type'],
                    subdate = data['subdate'],
                    status = "In Progress"
            )       
            return Response("Connectiong successfull")
        else:
            return Response("Data is not sending")
        

class UpdateFeedbackAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            try:
                obj = Submission.objects.get(id = data['subid'])
                obj.feddate = data['postdate']
                obj.fedcomment = data['comment']
                obj.status = data['status']
                obj.save()
                # result = Association.objects.get(id = data['tid'])
                # print("result is",result)
                # Notification.objects.create(
                #     usertype = "student",
                #     notification = "A new feedback has been provided by " + result.fname + " for " + result.coursename + " section (" + result.section + ")",
                #     userid = result.sid,
                #     image = result.fimage,
                # ) 
                if data['status'] == "Completed":
                    obj1 = Task.objects.get(id = data['tid'])
                    obj1.status = "completed"
                    obj1.save()
            except:
                pass
            return Response("Connectiong successfull")
        else:
            return Response("Data is not sending")
        

class SubDeleteAPIView(APIView):
    def get(self, request, id):
        if id:
            result = Submission.objects.get(id = id)
            result.delete()
            return Response("Updated")
        else:
            return Response("Not Sending")
        

class SkillSearchAPIView(APIView):
    def get(self, request, skillname):
        if skillname:
            queryset = Skills.objects.filter(skillname__icontains=skillname)
            serializer = SkillsSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class SkillAddAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            Skills.objects.create(
                    userid = data['id'],
                    skillname = data['skillname'],
            )
            return Response("Updated")
        else:
            return Response("Data is not sending")
        

class MySkillsAPIView(APIView):
    def get(self, request, userid):
        if userid:
            queryset = Skills.objects.filter(userid = userid)
            serializer = SkillsSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class MySkillsDeleteAPIView(APIView):
    def get(self, request, id):
        if id:
            result = Skills.objects.get(id = id)
            result.delete()
            return Response("Updated")
        else:
            return Response("Not Sending")
        

class AddCareerAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            Career.objects.create(
                    userid = data['userid'],
                    company = data['company'],
                    position = data['position'],
                    postdate = data['postdate'],
            )
            obj = StudentUser.objects.get(id = data['userid'])
            obj.company = data['company']
            obj.position = data['position']
            obj.save()
            return Response("Updated")
        else:
            return Response("Data is not sending")
        
class RemoveCareerAPIView(APIView):
    def get(self, request, id):
        if id:
            result = Career.objects.get(id = id)
            try:
                obj = StudentUser.objects.get(id = result.userid)
                if obj.company == result.company and obj.position == result.position:
                    obj.company = ''
                    obj.position = ''
                    obj.save()
            except:
                pass
            result.delete()
            return Response("Updated")
        else:
            return Response("Not Sending")
        

class MyCareerAPIView(APIView):
    def get(self, request, id):
        if id:
            queryset = Career.objects.filter(userid = id)
            serializer = CareerSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class UpRequestAPIView(APIView):
    def get(self, request, id):
        if id:
            queryset = StudentUser.objects.get(id = id)
            queryset.alumni = 1
            queryset.save()
            return Response("Updated")
        else:
            return Response("Not Looking")
        

class AlumniRequestAPIView(APIView):
    def get(self, request, department):
        if department:
            queryset = StudentUser.objects.filter(Q(department = department)&Q(alumni = 1))
            serializer = StudentUserSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        

class AlumniAPIView(APIView):
    def get(self, request, department):
        if department:
            queryset = StudentUser.objects.filter(Q(department = department)&Q(alumni = 2))
            serializer = StudentUserSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        
class AlumniApproveAPIView(APIView):
    def get(self, request, id):
        if id:
            queryset = StudentUser.objects.get(id = id)
            queryset.alumni = 2
            queryset.save()
            Notification.objects.create(
                usertype = "student",
                notification = "Your profile has been upgraded to alumni ",
                userid = id,
                image = '',
            ) 
            return Response("Approved!")
        else:
            return Response("Not Looking")
        

class AlumniIgnoreAPIView(APIView):
    def get(self, request, id):
        if id:
            queryset = StudentUser.objects.get(id = id)
            queryset.alumni = 0
            queryset.save()
            return Response("Ignored!")
        else:
            return Response("Not Looking")
        
class CompanyAPIView(APIView):
    def get(self, request):
            queryset = Career.objects.all()
            serializer = CareerSerializer(queryset, many=True)
            return Response(serializer.data)
  
class EventShowAPIView(APIView):
    def get(self, request, department):
            if department:
                queryset = Event.objects.filter(department = department)
                serializer = EventSerializer(queryset, many=True)
                return Response(serializer.data)
            else:
                return Response("Data is not sending")
    

class PostEventAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            Event.objects.create(
                    title = data['title'],
                    description = data['description'],
                    date = data['date'],
                    time = data['time'],
                    image = data['image'],
                    department = data['department'],
            )
            Notices.objects.create(
                notice = data['title'] + " On " + data['date'] + " Posted From " + data['department']
            )
            return Response("Updated")
        else:
            return Response("Data is not sending")
 

class DeleteEventAPIView(APIView):
    def get(self, request, id):
            if id:
                obj = Event.objects.get(id = id)
                obj.delete()
                return Response("Updated")
            else:
                return Response("Data is not sending")
            

class StartInteractionAPIView(APIView):
    def post(self, request):
            data = request.data
            if data:
                try:
                    obj = MyInteraction.objects.get(Q(aluid = data['aluid'])& Q(myid = data['myid']))
                    MyInteraction.objects.create(
                            aluid = obj.aluid,
                            aluname = obj.aluname,
                            aluimage = obj.aluimage,
                            myid = obj.myid,
                            myname = obj.myname,
                            myimage = obj.myimage,
                            mytype = obj.mytype,
                            company = obj.company,
                            position = obj.position
                         )
                    obj.delete()
                except:
                    aluobj = StudentUser.objects.get(id = data['aluid'])
                    if data['type'] == "Student":
                        myobj = StudentUser.objects.get(id = data['myid'])
                    else:
                        myobj = FacultyUser.objects.get(id = data['myid'])
                    if aluobj.company and aluobj.position:
                        MyInteraction.objects.create(
                            aluid = data['aluid'],
                            aluname = aluobj.fullname,
                            aluimage = aluobj.image,
                            myid = data['myid'],
                            myname = myobj.fullname,
                            myimage = myobj.image,
                            mytype = data['type'],
                            company = aluobj.company,
                            position = aluobj.position
                         )
                    else:
                        MyInteraction.objects.create(
                            aluid = data['aluid'],
                            aluname = aluobj.fullname,
                            aluimage = aluobj.image,
                            myid = data['myid'],
                            myname = myobj.fullname,
                            myimage = myobj.image,
                            mytype = data['type'],
                         )
                return Response("Updated")
            else:
                return Response("Data is not sending")
            

class InteractionAPIView(APIView):
    def get(self, request, id, type):
            if id and type:
                queryset = MyInteraction.objects.filter(Q(myid = id)& Q(mytype = type)).order_by('-id')
                serializer = MyInteractionSerializer(queryset, many=True)
                return Response(serializer.data)
            else:
                return Response("Data is not sending")
            
class MyInteractionAPIView(APIView):
    def get(self, request, id, type):
            if id and type:
                queryset = MyInteraction.objects.filter(Q(aluid = id)& Q(mytype = type)).order_by('-id')
                serializer = MyInteractionSerializer(queryset, many=True)
                return Response(serializer.data)
            else:
                return Response("Data is not sending")



class SendMessegeAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            print(data['messege'], data['postdate'])
            if data['file']:
                Message.objects.create(
                    sender = data['sender'],
                    receiver = data['receiver'],
                    msg = data['messege'],
                    time = data['postdate'],
                    file = data['file'],
                    type = data['type'],
                )
            else:
                Message.objects.create(
                    sender = data['sender'],
                    receiver = data['receiver'],
                    msg = data['messege'],
                    time = data['postdate'],
                    type = data['type'],
                )
            return Response("Updated")
        else:
            return Response("Data is not sending")
        

class MessegesAPIView(APIView):
    def get(self, request, send, receive, type):
            try:
                if send and receive:
                    queryset = Message.objects.filter((Q(sender = send)& Q(receiver = receive)& Q(type = type)) | (Q(sender = receive)& Q(receiver = send)& Q(type = type)))
                    serializer = MessegeSerializer(queryset, many=True)
                    return Response(serializer.data)
                else:
                    return Response("Data is not sending")
            except:
                pass


class DeleteInteractionAPIView(APIView):
    def get(self, request, id):
            if id:
                obj = MyInteraction.objects.get(id = id)
                Message.objects.filter((Q(sender = obj.aluid)& Q(receiver = obj.myid)& Q(type = obj.mytype)) | (Q(sender = obj.myid)& Q(receiver = obj.aluid)& Q(type = obj.mytype))).delete()
                obj.delete()
                return Response("Updated")
            else:
                return Response("Data is not sending")
            

class DoReportAPIView(APIView):
    def post(self,request):
        data = request.data
        if data:
            obj = StudentUser.objects.get(id = data['reporterid'])
            obj1 = StudentUser.objects.get(id = data['reportedid'])
            Report.objects.create(
                    reporterid = data['reporterid'],
                    reportername = obj.fullname,
                    reporterimage = obj.image,
                    reportedid = data['reportedid'],
                    reportedname = obj1.fullname,
                    reportedimage = obj1.image,
                    messege = data['messege'],
            )
            obj2 = MyInteraction.objects.get(id = data['id'])
            Message.objects.filter((Q(sender = obj2.aluid)& Q(receiver = obj2.myid)& Q(type = obj2.mytype)) | (Q(sender = obj2.myid)& Q(receiver = obj2.aluid)& Q(type = obj2.mytype))).delete()
            obj2.delete()
            return Response("Updated")
        else:
            return Response("Data is not sending")
        

class ReportAPIView(APIView):
    def get(self, request):
            queryset = Report.objects.all()
            serializer = ReportSerializer(queryset, many=True)
            return Response(serializer.data)
    
class ReportActionAPIView(APIView):
    def get(self, request,id):
            if id:
                obj = Report.objects.get(id = id)
                obj1 = StudentUser.objects.get(id = obj.reportedid)
                obj1.report = 1
                obj1.save()
                obj.status = "blocked"
                obj.save()
                return Response("Updated")
            else:
                return Response("Data is not sending")
            

class ReportIgnoreAPIView(APIView):
    def get(self, request,id):
            if id:
                obj = Report.objects.get(id = id)
                obj.delete()
                return Response("Updated")
            else:
                return Response("Data is not sending")


class ReportAbortAPIView(APIView):
    def get(self, request,id):
            if id:
                obj = Report.objects.get(id = id)
                obj1 = StudentUser.objects.get(id = obj.reportedid)
                obj1.report = 0
                obj1.save()
                obj.status = ""
                obj.save()
                return Response("Updated")
            else:
                return Response("Data is not sending")
            

class ReportSearchAPIView(APIView):
    def get(self, request, name):
        if name:
            queryset = Report.objects.filter(Q(reportername__icontains=name)|Q(reportedname__icontains=name))
            serializer = ReportSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Not Looking")
        
class AlumniUserAPIView(APIView):
    def get(self, request):
        queryset = StudentUser.objects.filter(alumni = 2)
        serializer = StudentUserSerializer(queryset, many=True)
        return Response(serializer.data)
    
class NoticesAPIView(APIView):
    def get(self, request):
        queryset = Notices.objects.all()
        serializer = NoticesSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
class NotificationAPIView(APIView):
    def get(self, request,id,type):
        if id and type:
            queryset = Notification.objects.filter(Q(userid = id)&Q(usertype = type))
            serializer = NotificationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Data not sending")
        

class NotificationFacultyAPIView(APIView):
    def get(self, request,email,type):
        if email and type:
            queryset = Notification.objects.filter(Q(userid = email)&Q(usertype = type))
            serializer = NotificationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response("Data not sending")
    
class NotificationDeleteAPIView(APIView):
    def get(self, request, id):
        if id:
            Notification.objects.get(id = id).delete()
            return Response("Updated")
        else:
            return Response("Data is not sending")
        
class NotificationDeleteAllAPIView(APIView):
    def get(self, request,id,type):
        if id and type:
            Notification.objects.filter(Q(userid = id)& Q(usertype = type)).delete()
            return Response("Deleted")
        

class NotificationDeleteAllFacultyAPIView(APIView):
    def get(self, request,email,type):
        if email and type:
            Notification.objects.filter(Q(userid = email)& Q(usertype = type)).delete()
            return Response("Deleted")
        
class MyFacultyAppAPIView(APIView):
    def get(self, request,id):
        if id:
            obj = FacultyUser.objects.get(id = id)
            queryset = FacultyApplication.objects.filter(femail = obj.email)
            serializer = FacultyApplicationSerializer(queryset, many=True)
            return Response(serializer.data)