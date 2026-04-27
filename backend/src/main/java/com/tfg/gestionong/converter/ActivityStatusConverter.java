package com.tfg.gestionong.converter;

import com.tfg.gestionong.model.Activity;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ActivityStatusConverter implements AttributeConverter<Activity.Status, String> {

    @Override
    public String convertToDatabaseColumn(Activity.Status status) {
        return status == null ? null : status.getDbValue();
    }

    @Override
    public Activity.Status convertToEntityAttribute(String dbValue) {
        return dbValue == null ? null : Activity.Status.fromDbValue(dbValue);
    }
}
