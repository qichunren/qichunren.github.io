memset(buffer, 0, len);
memcpy(buffer+2, item->uuid, sizeof(uuid_t));