#!/bin/bash

user=$1
password=$2

data='{"user":"'
data+=$user
data+='","password":"'
data+=$password
data+='"}'

curl -s -X POST -H 'Content-Type: application/json' \
  -d $data \
  localhost:3000 \
	| python3 -m json.tool
