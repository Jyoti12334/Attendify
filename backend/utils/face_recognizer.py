import face_recognition
import cv2
import pymongo
import numpy as np
import json
import sys

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["Attendify"]
students_col = db["students"]

known_face_encodings = []
known_face_names = []

for student in students_col.find():
    encoding = np.array(student["faceEncoding"])
    known_face_encodings.append(encoding)
    known_face_names.append(student["name"])

print(f"[INFO] Loaded {len(known_face_encodings)} face encodings.", file=sys.stderr)


cap = cv2.VideoCapture(0)
present_students = []

while True:
    ret, frame = cap.read()
    if not ret:
        print("[ERROR] Failed to grab frame", file=sys.stderr)
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    locations = face_recognition.face_locations(rgb)
    encodings = face_recognition.face_encodings(rgb, locations)

    print(f"[INFO] Detected {len(encodings)} face(s) in current frame.", file=sys.stderr)

    for face_encoding in encodings:
        distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        if len(distances) == 0:
            continue

        best_match_index = np.argmin(distances)
        if distances[best_match_index] < 0.5: 
            name = known_face_names[best_match_index]
            if name not in present_students:
                print(f"[INFO] Recognized: {name}", file=sys.stderr)
                present_students.append(name)
        else:
            print("[INFO] Face not recognized.", file=sys.stderr)

    cv2.imshow("Attendance", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

print(json.dumps(present_students))
sys.stdout.flush()
