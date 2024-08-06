package com.mockinterview.mockinterview.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.time.LocalTime;

public class LocalTimeDeserializer extends JsonDeserializer<LocalTime> {

    @Override
    public LocalTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        int hour = node.get("hour").asInt();
        int minute = node.get("minute").asInt();
        int second = node.get("second").asInt();
        int nano = node.get("nano").asInt();
        return LocalTime.of(hour, minute, second, nano);
    }
}
