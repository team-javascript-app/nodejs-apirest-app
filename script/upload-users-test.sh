#!/bin/bash

usernames=(Manuel Andrea Valeria)
passwords=(1234567890 5678444444 5555666666)

length=${#usernames[@]}

for (( i=0; i<length ;i++));
do
	echo "- Creando usuario $(($i+1))"
	echo $(curl -s -X POST \
	 	-H 'Content-Type: application/json' \
		-d "{\"id\":0,\"username\":\"${usernames[$i]}\",\"password\":\"${passwords[$i]}\"}" \
		localhost:3000/api/v1/user) \
		| python3 -m json.tool
	echo "-------------------------"
done
