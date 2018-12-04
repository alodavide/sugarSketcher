#!/bin/bash

SCRATCHDIR=${1:?}
installpath=${2:?}

obabel_version="2-4-0"

echo "CREATING SCRATCHDIR: '${SCRATCHDIR}'"
mkdir -p ${SCRATCHDIR}

echo "ENTERING '${SCRATCHDIR}'"
cd ${SCRATCHDIR}

echo "DOWNLOADING SOURCE CODE..."
wget https://github.com/openbabel/openbabel/archive/openbabel-${obabel_version}.tar.gz

echo "UNPACKING SOURCE CODE..."
tar zxf "./openbabel-${obabel_version}.tar.gz"

echo "CREATING BUILD DIRECTORY..."
mkdir build
echo "ENTERING BUILD DIRECTORY..."
cd build

echo "STARTING BUILD PROCESS..."
cmake "../openbabel-openbabel-${obabel_version}/" -DCMAKE_INSTALL_PREFIX=$installpath
make && make install

