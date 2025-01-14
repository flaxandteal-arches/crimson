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

4. The final step will be building up the whole project using the makefile in the root folder:


You will first need to change the SHOW_LANGUAGE_SETTING in:
```
crimson/crimson/settings.py
```
Set this to False

This needs to be set as False for local builds but True to pass the CI.
Keep this change local but do not push to the repo

### Option 1 With Base Arches

There are 2 ways to run the build, one is with having a copy of base arches locally. This will allow you to edit and log within arches for development.

You will need to clone the arches repo into the parent directory of the project and then run:

```
ARCHES_ROOT=$(pwd)/../arches make build
```

Any subsequent make command you will need to run add the `ARCHES_ROOT=$(pwd)/../arches` prefix

### Option 2 Modifying Docker Compose

The alternative is to make adjustments to the docker-compose file. You will need to comment out and remove the following lines from the volume mounts:

```
- ${ARCHES_ROOT}:/web_root/arches
- ${ARCHES_ROOT}/docker/gunicorn_config.py:/web_root/arches/gunicorn_config.py
```
 These exist within:
- arches
- arches_api
- arches_worker

You can then run:

```
make build
```

Once the project has built, you can run the project using:

```
make run
```

### Importing Concepts

The concepts should import on the initial build but if they do not you can manually import them with the following commands

First import the concepts:

```
make manage CMD="packages -o import_reference_data -s crimson/pkg/reference_data/concepts/ce-arches-thes-06-11.xml -ow 'overwrite'"
```

Then import the collections

```
make manage CMD="packages -o import_reference_data -s crimson/pkg/reference_data/collections/ce-arches-coll-06-11.xml -ow 'overwrite'"
```

### Importing Models

The models should import once the make file has built the project. If this is not the case you may need to import them manually.

Import the branches first:

```
make manage CMD="packages -o import_graphs -s crimson/pkg/graphs/branches/Object.json"
```
Proceed to import each model that exists within the branches folder

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

### Activating the Bulk Data Manager
The Bulk Data Manager does not show by default. You will need to activate it by following the instructions here:

https://arches.readthedocs.io/en/stable/administering/bulk-data-manager/

### Importing the Import Single CSV with Processing
You will need to follow the instructions in this repo to install the module:

https://github.com/flaxandteal/arches_doorstep.git


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

```
make manage CMD="your command"
```


### Issues
You can encounter an error on build that states:
    Only one python package can be used

If this happens during the build you can delete the `_init_.py` in the test folder.

