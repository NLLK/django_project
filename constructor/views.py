from distutils import command
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from authentication.serializers import UserSerializer
from .models import Questionnaire, User

class GetQuestionnaireList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        objects = Questionnaire.objects.values('id', 'name', 'comment')
        content = objects
        return Response(content)



class CreateQuestionnaire(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        rec = Questionnaire(
            name = 'test',
            author = User.objects.get(username = 'admin'),
            comment = 'comment',
            fields = {'aboba': 1}
        )
        rec.save()
        content = {'aboba': 'aboba'}
        return Response(content)
   