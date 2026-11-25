from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from app.analysis import extractive_overview, format_time
from app.media import _parse_vtt
from app.security import UnsafeSourceError, validate_public_media_url


class CoreTests(unittest.TestCase):
    def test_time_format(self):
        self.assertEqual(format_time(0), "00:00")
        self.assertEqual(format_time(92), "01:32")
        self.assertEqual(format_time(3661), "01:01:01")

    def test_overview_has_keywords_and_timestamps(self):
        segments = [
            {"start": 2.5, "end": 6, "text": "Энергетическая система использует тепловой насос и аккумулятор."},
            {"start": 14, "end": 19, "text": "Накопитель помогает управлять нагрузкой здания."},
        ]
        result = extractive_overview(segments)
        self.assertEqual(result["mode"], "extractive")
        self.assertTrue(result["highlights"])
        self.assertTrue(any(item["time"] == "00:02" for item in result["highlights"]))

    def test_parse_vtt(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "sample.vtt"
            path.write_text("""WEBVTT

00:00:01.000 --> 00:00:03.000 align:start
Привет <b>мир</b> &amp; добро.

00:00:03.500 --> 00:00:05.000
Следующий фрагмент.
""", encoding="utf-8")
            result = _parse_vtt(path)
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]["text"], "Привет мир & добро.")
        self.assertAlmostEqual(result[1]["start"], 3.5)

    def test_url_scheme_rejected_before_dns(self):
        with self.assertRaises(UnsafeSourceError):
            validate_public_media_url("http://youtube.com/watch?v=test")

    def test_non_allowlisted_domain_rejected(self):
        with self.assertRaises(UnsafeSourceError):
            validate_public_media_url("https://example.com/video")

    def test_private_dns_address_rejected(self):
        fake_result = [(None, None, None, None, ("127.0.0.1", 443))]
        with patch("app.security.socket.getaddrinfo", return_value=fake_result):
            with self.assertRaises(UnsafeSourceError):
                validate_public_media_url("https://youtube.com/watch?v=example")

    def test_invalid_port_rejected(self):
        with self.assertRaises(UnsafeSourceError):
            validate_public_media_url("https://youtube.com:invalid/watch?v=example")


if __name__ == "__main__":
    unittest.main()
