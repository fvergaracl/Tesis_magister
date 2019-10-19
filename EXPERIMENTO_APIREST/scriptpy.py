#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
import csv

with open('query_result.csv') as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	for row in csv_reader:
		try:
			r = requests.get(row[3])
			if r.status_code != 200:
				print str(r.status_code) + ' | ' + row[3]
		except Exception as e:
			print '[ERROR] ('+ row[3] +') ' + str(e) 
		