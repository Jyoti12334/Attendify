import asyncio
import json
import sys
from bleak import BleakScanner

async def scan(target_uuid_map):
    results = {name: False for name in target_uuid_map}

    def detection_callback(device, advertisement_data):
        service_uuids = advertisement_data.service_uuids or []

        for student_name, target_uuid in target_uuid_map.items():
            for uuid in service_uuids:
                if uuid.lower() == target_uuid.lower():
                    results[student_name] = True

    try:
        scanner = BleakScanner(detection_callback)
        await scanner.start()
        await asyncio.sleep(10.0)
        await scanner.stop()
    except Exception as e:
        print(f"[ERROR] BLE Scanner failed: {e}", file=sys.stderr)

    print(json.dumps(results))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Missing input", file=sys.stderr)
        sys.exit(1)

    try:
        input_json = sys.argv[1]
        target_uuid_map = json.loads(input_json)
        asyncio.run(scan(target_uuid_map))
    except Exception as e:
        print(f"[ERROR] Failed to parse input or run scan: {e}", file=sys.stderr)
        print(json.dumps({}))
