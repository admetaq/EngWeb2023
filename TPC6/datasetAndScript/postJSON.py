import json
import threading
import requests

success_counter = 0

def insert_data(pessoas, url, headers,  lock):
    global success_counter
    num_cic = int(len(pessoas)/50)
    for i in range(num_cic):
        start = i * 50
        end = start + 50 if i < num_cic - 1 else len(pessoas)
        response = requests.post(url, json=pessoas[start:end], headers=headers)
        if response.status_code == 200:
            with lock:
                success_counter += 50
        else:
            print("Error")

    
       

f = open("dataset-extra1.json", "r")

dict = json.load(f)

url = 'http://localhost:7777/'


headers = {'Content-type': 'application/json'}

num_threads = 5

chunk_size = len(dict['pessoas']) // num_threads

lock = threading.Lock()



threads = []
for i in range(num_threads):
    start = i * chunk_size
    end = start + chunk_size if i < num_threads - 1 else len(dict['pessoas'])
    pessoas_chunk = dict['pessoas'][start:end]
    t = threading.Thread(target=insert_data, args=(pessoas_chunk, url, headers, lock))
    threads.append(t)
    t.start()

for thread in threads:
    thread.join()

print(f"Number of successful inserts: {success_counter}")
