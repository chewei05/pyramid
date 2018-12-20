$(document).ready(function () {
    $("#btnCalculate").click(function () {
        var interval = parseInt($("#txtInterval").val());
        var price = parseFloat($("#txtClosingPrice").val());
        var stock_price_index = parseFloat($("#txtStockPriceIndex").val());
        var times = parseInt($("#txtTimes").val());
        var dayhigh = parseFloat($("#txtDayHigh").val()) / 100;
        var daylow = parseFloat($("#txtDayLow").val()) / 100;
        var percent = parseFloat((dayhigh - daylow) / (interval - 1));
        var width = 0.0;
        var c_width = 20.0; // 金字塔中央寬(單位:百分比)
        var min_width = 2.0; // 最小寬度(單位:百分比)
        var bar_color = '#818bd5';

        $(".Result").show();
        for (var i = 0; i < interval; i++) {
            if (i > 0)
                $(".table-data-row").eq(0).clone().appendTo(".table-body");
            if (i >= 0) {
                var amplitude1 = parseFloat(dayhigh - percent * i);
                $(".table-data-row").eq(i).find("span[name='amplitude1']").html((amplitude1 * 100).toFixed(2) + '%');
                $(".table-data-row").eq(i).find("span[name='amplitude2']").html(parseFloat(stock_price_index * (1 + amplitude1)).toFixed(1));

                var width = (parseFloat((i + 1) / interval * 100) - c_width) / 2; // 左右各有一邊
                if (width < min_width) width = min_width;
                $(".table-data-row").eq(i).find("div[name='bar1']").attr('style', 'width:' + c_width + '%;');
                $(".table-data-row").eq(i).find("div[name='bar1']").attr('data-tooltip', '掛單:' + parseFloat(price * (1 + amplitude1)).toFixed(2) + '元');
                $(".table-data-row").eq(i).find("div[name='bar1']").find("span[name='price']").html(parseFloat(price * (1 + amplitude1)).toFixed(2));
                $(".table-data-row").eq(i).find("div[name='bar2']").attr('style', 'width:' + width + '%;background:' + bar_color + ';');
                // $(".table-data-row").eq(i).find("div[name='bar2']").html(width.toFixed(2) + '%');
                $(".table-data-row").eq(i).find("div[name='bar3']").attr('style', 'width:' + width + '%;background:' + bar_color + ';');
                // $(".table-data-row").eq(i).find("div[name='bar3']").html(width.toFixed(2) + '%');
            }
            // alert('ok');
        }
        // if (i == interval) {
            // $(".table-data-row").eq(0).find("span[name='amplitude1']").html(parseFloat(dayhigh * 100).toFixed(2) + '%');
            // $(".table-data-row").eq(0).find("span[name='amplitude2']").html(stock_price_index - stock_price_index * dayhigh)
        // } else
    });
    $("#btnTest").click(function () {
        $("#txtInterval").val(10);
        $("#txtClosingPrice").val(42.3);
        $("#txtStockPriceIndex").val(14250);
        $("#txtTimes").val(2);
        $("#txtDayHigh").val(-1);
        $("#txtDayLow").val(-5);
    });
});