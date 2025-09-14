import face_recognition
import cv2
import sys
import json

name = sys.argv[1]

video = cv2.VideoCapture(0, cv2.CAP_DSHOW)

while True:
    ret, frame = video.read()
    cv2.imshow('Register Face', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        face_encodings = face_recognition.face_encodings(frame)
        if face_encodings:
            face_encoding = face_encodings[0].tolist()
            break

video.release()
cv2.destroyAllWindows()

print(json.dumps(face_encoding))