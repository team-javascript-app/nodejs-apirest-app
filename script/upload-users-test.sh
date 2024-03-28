#!/bin/bash

users=(Manuel Andrea Valeria)
passwords=(1234 5678 5555)

length=${#users[@]}

for (( i=0; i<length ;i++));
do
	echo "- Creando usuario $(($i+1))"
	echo $(curl -s -X POST \
	 	-H 'Content-Type: application/json' \
		-d "{\"user\":\"${users[$i]}\",\"password\":\"${passwords[$i]}\"}" \
		localhost:3000) \
		| python3 -m json.tool
	echo "-------------------------"
done
