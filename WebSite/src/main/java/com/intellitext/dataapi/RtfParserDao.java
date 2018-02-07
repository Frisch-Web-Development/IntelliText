package com.intellitext.dataapi;

import java.io.IOException;
import java.io.Reader;

public interface RtfParserDao {

	String rtfToHtml(Reader rtf) throws IOException;

}
