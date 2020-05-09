(function () {
  var cleanNumber = function (i) {
      return i.replace(/[^\-?0-9.]/g, "");
    },
    compareNumber = function (a, b) {
      a = parseFloat(a);
      b = parseFloat(b);

      // NaN betyr tom streng (ikke noe resultat) og gis derfor et høy tall så det kommer nederst
      a = isNaN(a) ? 10000 : a;
      b = isNaN(b) ? 10000 : b;

      return a - b;
    };

  Tablesort.extend(
    "number",
    function (item) {
      return (
        item.match(/^[-+]?[£\x24Û¢´€]?\d+\s*([,\.]\d{0,2})/) || // Prefixed currency
        item.match(/^[-+]?\d+\s*([,\.]\d{0,2})?[£\x24Û¢´€]/) || // Suffixed currency
        item.match(/^[-+]?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/)
      ); // Number
    },
    function (a, b) {
      a = cleanNumber(a);
      b = cleanNumber(b);

      return compareNumber(b, a);
    },
  );
})();
