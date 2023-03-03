import json

f = open("dataset-extra1.json", "r")

ds = json.load(f)
f.close()
i = 0
for pessoa in ds["pessoas"]:
    pessoa["id"] = "p"+ str(i)
    i+=1

fsaida = open("dataset-extra1.json", "w")
json.dump(ds,fsaida, indent = -1, ensure_ascii = False)
fsaida.close()


