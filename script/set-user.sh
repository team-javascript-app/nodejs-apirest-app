#!/bin/bash

username=$1
password=$2

data="{\"id\":0,\"username\":\"${username}\",\"password\":\"${password}\"}"

echo "${data}"

#data='{"user":"'
#data+=$user
#data+='","password":"'
#data+=$password
#data+='"}'

curl -s -X POST -H 'Content-Type: application/json' \
  -d $data \
  localhost:3000/api/v1/user \
	| python3 -m json.tool
