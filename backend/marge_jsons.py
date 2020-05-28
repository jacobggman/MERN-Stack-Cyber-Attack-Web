import json
import glob

PATH = r''
print(PATH + '\\' + "*.json")

class Json(object):
    pass

result = []
for f in glob.glob(PATH + '\\' + "*.json"):
    with open(f, "rb") as infile:
        result.append(json.load(infile))

b = json.dumps(result)
with open("merged_file.json", "w") as outfile:
    outfile.write(b)
