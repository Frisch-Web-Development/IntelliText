package com.dataapi;

import java.io.IOException;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;

import javax.swing.JEditorPane;
import javax.swing.text.BadLocationException;
import javax.swing.text.EditorKit;

public class RtfParserDaoImpl implements RtfParserDao {

	@Override
	public String rtfToHtml(Reader rtf) throws IOException {
		JEditorPane p = new JEditorPane();
		p.setContentType("text/rtf");
		EditorKit kitRtf = p.getEditorKitForContentType("text/rtf");
		try {
			kitRtf.read(rtf, p.getDocument(), 0);
			kitRtf = null;
			EditorKit kitHtml = p.getEditorKitForContentType("text/html");
			Writer writer = new StringWriter();
			kitHtml.write(writer, p.getDocument(), 0, p.getDocument().getLength());
			return writer.toString();
		} catch (BadLocationException e) {
			e.printStackTrace();
		}
		return null;
	}

}
