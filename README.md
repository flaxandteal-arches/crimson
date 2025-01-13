# Welcome to the Crimson-Arches Project!

## Arches
Arches is a new, open-source, web-based, geospatial information system for cultural heritage inventory and management. Arches is purpose-built for the international cultural heritage field, and it is designed to record all types of immovable heritage, including archaeological sites, buildings and other historic structures, landscapes, and heritage ensembles or districts.

Please see the [project page](http://archesproject.org/) for more information on the Arches project.

The Arches Installation Guide and Arches User Guide are available [here](http://archesproject.org/documentation/).

## Crimson
Crimson is a project that is being built with the Science Museum to improve upon how data is uploaded into arches. The aim is to build an Arches plugin that will allow CSV and shapefiles to be uploaded and to identify any errors that are present in the input file. These can then be flagged to the user for correction and changes and updates can be made

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisite

Docker Engine: Docker version  25.0.0 <br />
Docker-compose standalone: v2.24.2 <br />
Python3 venv  

The installation guide for the dockers are here:
* [Docker Engine](https://docs.docker.com/compose/install/linux/)
* [Docker Compose](https://docs.docker.com/compose/install/standalone/)

Both docker and docker-compose must be able to be run without sudo. It is possible to check it by running this commands seperately
```
docker-compose -v
docker -v
docker run hello-world
```

In case docker compose requires sudo, run this command (a restart is required afterward!)
```
sudo chmod a+x /usr/local/bin/docker-compose
```

If there is no python virtual environment installed in your machine, use this command to install python venv
```
sudo apt install python3.10-venv
```

### Installation Guide [For Linux User]

To get started with the crimson main branch you need to follow the following step:
1. Clone the repository by running the following command in your terminal:
```
git clone <git@github.com:flaxandteal-arches/crimson.git>
```
This will clone the repository into your local machine. A good practice to not bloat your global environment is in the next step:

2. a. Use Python Virtual Environment

```
python3 -m venv ENV
```

2. b. Activate the virtual environment

```
source ENV/bin/activate
```

3. Once the repository is cloned, navigate to the project root folder. Run the following command to initialize and update the submodules:

```
cd crimson
git submodule update --init --recursive
```

It will download the submodules needed to run the build file.

4. The final step will be building up the whole project using the makefile in the root folder, using this command:

```
make build
```

for each time you want to run the project, you can just open it in localhost:8000 after running the script

```
make run
```

If you receive an error about ARCHES_ROOT please see the section below on how to fix

### Importing Models

The models should import once the make file has built the project. If this is not the case you may need to import them manually.

Import the branches first:

```
make manage CMD="packages -o import_graphs -s crimson/pkg/graphs/branches/Object.json"
```

Followed by the models:
```
make manage CMD="packages -o import_graphs -s crimson/pkg/graphs/resource_models/Object.json"
```

You will need to do this for each model in the directories:
```
crimson/pkg/graphs/branches
```
```
crimson/pkg/graphs/resource_models
```

### Make File
The make file is used to run the containers as well as run any Django specific commands to manipulate arches.
Useful commands are:

```
make build
```
This will start the containers and run the arches instance

```
make npm-development
```
This will rebuild the front end. This needs to be run if any javascript or html is edited

```
make clean
```
This will clear the database. This is useful if you are looking to create a fresh build

```
make docker-compose CMD="build"
```
This will rebuild the containers. If dependencies change, this will need to run. This is similar to make build without rebuilding the database.

### Arches Root
You can run Crimson with a base copy of arches mounted. This allows you to debug any core functionality.
You will need to run arches-7.6.
If you clone a copy of the arches repo into the same directory as crimson and when running the make commands you can use:

```
ARCHES_ROOT=$(pwd)/../arches make run
```
This will run using the cloned repo

If you do not want to clone the arches repo you will need to make adjustments to the docker-compose.yml.

The following volume mounts will need to be removed:

```
- ${ARCHES_ROOT}:/web_root/arches
- ${ARCHES_ROOT}/docker/gunicorn_config.py:/web_root/arches/gunicorn_config.py
```
 These exist within:
- arches
- arches_api
- arches_worker

You will receive an error that ARCHES_ROOT is not set if these are not removed or commented out

### Issues
You may encounter an issue on build or run where the templates are not found and the application will not start.
This is usually caused by the SHOW_LANGUAGE_SWITCH.

For this to run locally it needs to be set to False, for the CI to run this needs to be set to True.

This can be found in 
```
crimson/crimson/settings.py
```

Change this locally but do not push

