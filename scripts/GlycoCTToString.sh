#!/bin/bash

# timestamp/unique id of this request
tm=$2

# cwd for this request
CWDIR=$3

cd "${CWDIR}"

# urlencoded GlycoCT string
glct=$1

id="id${tm}"

tmpoutdir="./out${tm}"
mkdir "${tmpoutdir}"

wget "http://csdb.glycoscience.ru/database/core/convert_api.php?glycoct=$glct" -O "${tmpoutdir}/$id"
grep "Errors" "${tmpoutdir}/$id" >> "errors${tm}"
grep "<pre>CSDB Linear:" "${tmpoutdir}/$id" > e$id
cat e$id 
sed -i -e 's/<pre>CSDB Linear: //g' e$id
sed -i -e 's/\R//g' e$id
stati=`stat -c '%s' e$id` # file size check 
if [ $stati -gt 1 ];then

	sed -i -e 's/\,/%2C/g' e$id
	sed -i -e 's/\[/%5B/g' e$id
	sed -i -e 's/\]/%5D/g' e$id
	sed -i -e 's/\?/%3F/g' e$id
	eid=`cat e$id`
	cat $eid
	wget http://www.glycosciences.de/tools/sweet-remote/get3dmodel.php?format=csdb"&"structure=$eid -O "${tmpoutdir}/f$id"
	fid='f'$id
	grep "download coordinates" "${tmpoutdir}/$fid" >"${tmpoutdir}/g$id"
	sed -i -e 's/				<a href\=\"./http:\/\/www.glycosciences.de\/tools\/sweet-remote/g' "${tmpoutdir}/g$id"
	sed -i -e 's/\">download coordinates<\/a><br><br>//g' "${tmpoutdir}/g$id"		
	gid='g'$id
	pdid=`cat ${tmpoutdir}/$gid`
	echo $pdid
	wget `echo $pdid` -O "${tmpoutdir}/$id.pdb"
	if [ -f "${tmpoutdir}/$id.pdb" ] ; then
		echo "Conversion to $id.smi"
		/opt/obabel/bin/babel -ipdb "${tmpoutdir}/$id.pdb" -osmi "${tmpoutdir}/$id.smi" --title ""
	fi
else
	echo "invalid translation" $id
fi
ismi=$(cat "${tmpoutdir}/$id.smi")

smiles=(${ismi/ / })

# Marvin fix for uninitialized native library error
export CHEMAXON_HOME="./chemaxonhome"
mkdir CHEMAXON_HOME

echo "InChI conversion"
# Obabel InChI
#/opt/obabel/bin/babel -ipdb "${tmpoutdir}/$id.pdb" -oinchi "${tmpoutdir}/inchi"
molconvert inchi -v "${tmpoutdir}/$id.smi" -o "${tmpoutdir}/inchi"
grep 'InChI' "${tmpoutdir}/inchi" >> "${tmpoutdir}/inchis.txt"

echo "InChIKey conversion..."
# Obabel InChIKey
#/opt/obabel/bin/babel -ipdb "${tmpoutdir}/$id.pdb" -oinchi "${tmpoutdir}/sortinchikey" -xK
molconvert inchikey -v "${tmpoutdir}/$id.smi" -o "${tmpoutdir}/sortinchikey"

inchi=$(cat "${tmpoutdir}/inchis.txt")
inchikey=$(cat "${tmpoutdir}/sortinchikey")
smiles=$(cat ${tmpoutdir}/*.smi)

if [[ -z "${inchi}" ]];then
  echo "Could not produce chemical codes. The structure should be fully defined." > "./output"
else
  echo "${inchi}" > "./output"
  echo "" >> "./output"
  echo "${inchikey}" >> "./output"
  echo "" >> "./output"
  #echo "InChIKey=${inchikey}" >> "./output"    # Obabel InChIKey
  echo "SMILES=${smiles}" >> "./output"
fi
