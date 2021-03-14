FROM python:3.7
ENV PYTHONUNBUFFERED 1
WORKDIR /dockDjango
ADD . /dockDjango 
COPY requirements.txt /dockDjango/
RUN pip install -r requirements.txt