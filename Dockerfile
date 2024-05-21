FROM python:3.12.3-bullseye as prod

# install some utils 
RUN apt-get update && apt-get install -y \
  gcc vim \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt requirements.txt 

# install requirements
RUN pip install -r requirements.txt

WORKDIR /app

# Removing gcc
RUN apt-get purge -y \
  gcc \
  && rm -rf /var/lib/apt/lists/*

# Copying actuall application
COPY . .

CMD ["python3", "app/main.py"]
