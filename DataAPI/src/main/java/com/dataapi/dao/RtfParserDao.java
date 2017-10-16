package com.dataapi.dao;

import java.io.IOException;
import java.io.Reader;

public interface RtfParserDao {

	String rtfToHtml(Reader rtf) throws IOException;

}
