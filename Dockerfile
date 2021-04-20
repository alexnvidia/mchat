FROM python:3.7
ENV PYTHONUNBUFFERED 1
WORKDIR /dockDjango
ADD . /dockDjango 
COPY requirements.txt /dockDjango/
RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic
RUN chmod +x InitialData.sh