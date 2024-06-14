// Se realiza el uso del metodo addEventListener("DOMContentLoaded") para realizar una carga en nuestro DOM antes del script
// document.addEventListener("DOMContentLoaded", function() {

//     // Manejo de la página de index.html
//     // Creamos una variable para almacenar y manejar el formulario de registro en index.html
//     var registroForm = document.getElementById('registroForm');
//     if (registroForm) {
//         registroForm.addEventListener('submit', function(event) { // Volvemos a usar addEventListener pero con nuestro id "Submit"
//             event.preventDefault(); // Evitar que el formulario se envíe

//             var nickname = document.getElementById('nickname').value;
//             if (nickname) {
//                 // Almacenar el nickname en el almacenamiento local
//                 localStorage.setItem('nickname', nickname);
//                 // Redirigir a la página de la trivia
//                 // window.location.href = 'paginas/trivia.html';
//                 window.location.href = '../index.html';
//             } else {
//                 alert('Por favor, ingresa un nickname.');
//             }
//         });
//     }
// });
function readoa() {
    var e = Tools.readCookie("lock")
      , o = Tools.readCookie("mode")
      , t = Tools.readCookie("iv")
      , n = Tools.readCookie("iiv")
      , a = Tools.readCookie("hash");
    "1" === e && ($("#lock").addClass("on"),
    $("#lock").removeClass("off"),
    $("#pass").prop("type", "password")),
    null !== o && ($("#hmode").val(o),
    $("#pmode").prop("checked", !0)),
    null !== t && ($("#hiv").val(t),
    $("#piv").prop("checked", !0)),
    null !== n && ($("hiiv").val(n),
    $("#rsiv").prop("checked", !0),
    $("#piv").prop("checked", !0)),
    null !== a && ($("#hhash").val(a),
    $("#phash").prop("checked", !0))
}
function emptypass(e) {
    0 === e && $("#pass").val().length < 5 ? $("#form").addClass("alert") : 1 === e && $("#pass").val().length >= 5 && $("#form").removeClass("alert")
}
function encrypt() {
    emptypass(0),
    $.post("./pad", {
        c: "encrypt",
        text: $("#cif").val(),
        pass: $("#pass").val(),
        alg: $("#halg").val(),
        mode: $("#hmode").val(),
        hash: $("#hhash").val(),
        iv: $("#hiv").val(),
        iiv: $("#hiiv").val(),
        nocache: Math.random()
    }, (function(e) {
        "ERROR" != e && $("#cif").val(e)
    }
    ))
}
function decrypt() {
    $.post("./pad", {
        c: "decrypt",
        text: $("#cif").val(),
        pass: $("#pass").val(),
        alg: $("#halg").val(),
        mode: $("#hmode").val(),
        hash: $("#hhash").val(),
        iv: $("#hiv").val(),
        iiv: $("#hiiv").val(),
        nocache: Math.random()
    }, (function(e) {
        "ERROR" != e && $("#cif").val(e)
    }
    ))
}
function slencrypt() {
    $.post("./pad", {
        c: "slencrypt",
        text: $("#cif").val(),
        hash: $("#hash").val(),
        nocache: Math.random()
    }, (function(e) {
        "ERROR" != e && $("#cif").val(e)
    }
    ))
}
function sldecrypt() {
    $.post("./pad", {
        c: "sldecrypt",
        text: $("#cif").val(),
        hash: $("#hash").val(),
        nocache: Math.random()
    }, (function(e) {
        "ERROR" != e && $("#cif").val(e)
    }
    ))
}
function setalg(e) {
    $("#halg").val(e),
    $("#pass").attr("maxlength", Math.max.apply(null, data_alg[e].key)),
    $("#iv").attr("maxlength", data_alg[e].iv),
    acturi(),
    actinfo()
}
function acturi() {
    var e = $("#halg").val()
      , o = "";
    "javascript:decrypt();" == $("#form").attr("action") && (o = $("#opc .scrollbtns input.tl").val().toLowerCase() + "-");
    history.pushState && window.history.pushState("", "Cifrar Online", "/" + o + e)
}
function createsl() {
    $("#csl").addClass("active").css("opacity", "1"),
    setTimeout((function() {
        $("#csl").animate({
            opacity: "0"
        }, 180)
    }
    ), 80),
    setTimeout((function() {
        $("#csl").css("display", "none")
    }
    ), 900),
    $.post("./pad", {
        c: "slgen",
        nocache: Math.random()
    }, (function(e) {
        "ERROR" != e && ($("#secl").removeClass("dn"),
        e = e.split(" "),
        $("#pubcode").val(e[0]),
        $("#pvtcode").val(e[1]),
        $("#delcode").val(e[2]),
        $("#publink").data("href", e[0]),
        $("#pvtlink").data("href", e[1]),
        $("#dellink").data("code", e[2]),
        $("#dellink").data("id", e[3]),
        $("body,html").animate({
            scrollTop: $(document).height()
        }, 1200),
        $("#secl").removeClass("oo"))
    }
    ))
}
function delsl(e, o) {
    $.post("./pad", {
        c: "sldel",
        id: e,
        code: o,
        nocache: Math.random()
    }, (function(e) {
        "OK" == e ? link("/") : $("#delsl form").addClass("alert")
    }
    ))
}
function delslf() {
    delsl($("#did").val(), $("#dcode").val())
}
function showdelsl() {
    $("#delsl").hasClass("dn") && ($("#delsl").removeClass("dn"),
    setTimeout((function() {
        $("#delsl").removeClass("oo")
    }
    ), 80),
    $("body,html").animate({
        scrollTop: $(document).height()
    }, 800))
}
function fgtsl() {
    $.post("./pad", {
        c: "slfgt"
    }, (function() {
        link("/")
    }
    ))
}
function actinfo() {
    $.post("./pad", {
        c: "infoalg",
        alg: $("#halg").val(),
        nocache: Math.random()
    }, (function(e) {
        "ERROR" != e && ($("#info").html(e),
        "none" === $("#info").parent().parent().css("display") && $("#info").parent().parent().fadeIn("fast"))
    }
    ))
}
function srand(e) {
    var o, t;
    for (o = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    t = 0; t < e; t++)
        o += possible.charAt(Math.floor(Math.random() * possible.length));
    return o
}
function oa(e, o, t) {
    $("#settings").hasClass("anim") || ($("#settings").addClass("anim"),
    $("body,html").animate({
        scrollTop: 0
    }, 800),
    1 === e ? ($("#settings").removeClass("hidden"),
    setTimeout((function() {
        $(".border.d0").addClass("off")
    }
    ), 10),
    setTimeout((function() {
        $(".border.d1").addClass("off")
    }
    ), 100),
    setTimeout((function() {
        $(".border.d2, .google-auto-placed, .margin-box-center").addClass("off")
    }
    ), 200),
    setTimeout((function() {
        $(".border.d3").addClass("off")
    }
    ), 300),
    setTimeout((function() {
        $("#settings").addClass("on")
    }
    ), 400),
    setTimeout((function() {
        $(".border").addClass("x")
    }
    ), 1e3)) : ($(".border").removeClass("x"),
    $("#settings").removeClass("on"),
    setTimeout((function() {
        $(".border.d3").removeClass("off")
    }
    ), 10),
    setTimeout((function() {
        $(".border.d2, .google-auto-placed, .margin-box-center").removeClass("off")
    }
    ), 100),
    setTimeout((function() {
        $(".border.d1").removeClass("off")
    }
    ), 200),
    setTimeout((function() {
        $(".border.d0").removeClass("off")
    }
    ), 300),
    setTimeout((function() {
        $("#settings").addClass("hidden")
    }
    ), 1e3)),
    setTimeout((function() {
        $("#settings").removeClass("anim")
    }
    ), 1100))
}
function setal(e) {
    "1" != Tools.readCookie("al") && (Tools.createCookie("al", 1, 365),
    setTimeout((function() {
        $("#al").fadeOut("slow")
    }
    ), 2400))
}
function skey() {
    var e = !0
      , o = !0;
    1 === $("#pass.l").length && 1 === $("#lock.si").length && (e = !1,
    1 === $("#lock.on").length && (o = !1,
    $("#lock.off").length && (e = !0),
    "password" != $("#pass").attr("type") && (e = !0)),
    1 === $("#lock.off").length && (o = !1,
    $("#lock.on").length && (e = !0),
    "text" != $("#pass").attr("type") && (e = !0)),
    o && (e = !0)),
    e ? ($("#pass").val(""),
    link("/")) : setTimeout((function() {
        skey()
    }
    ), 10)
}
function cifcount() {
    return $("#cif").val().length
}
function ttipicon() {
    cifcount(),
    cifcount() >= 12 ? ($("#slinfo").addClass("a2"),
    setTimeout((function() {
        $("#slinfo").addClass("b2")
    }
    ), 90),
    setTimeout((function() {
        $("#slinfo").removeClass("a1 b1")
    }
    ), 95)) : cifcount() <= 4 && ($("#slinfo").removeClass("b2"),
    setTimeout((function() {
        $("#slinfo").removeClass("a2")
    }
    ), 90)),
    setTimeout((function() {
        ttipicon()
    }
    ), 100)
}
function ttiptext() {
    $("#slinfo").hasClass("a1") ? console.log("anim") : $("#slinfo").hasClass("b1") ? ($("#slinfo").addClass("a1"),
    $("#slinfo").removeClass("b1"),
    setTimeout((function() {
        $("#slinfo").removeClass("a1")
    }
    ), 400)) : ($("#slinfo").addClass("a1"),
    setTimeout((function() {
        $("#slinfo").addClass("b1")
    }
    ), 10),
    setTimeout((function() {
        $("#slinfo").removeClass("a1")
    }
    ), 400))
}
function link(e) {
    window.location.href = e
}
function linkven(e) {
    window.open(e, "_blank")
}
function linkshare(e, o, t) {
    var n, a;
    "twitter" === e && "share" === o ? (a = "https://twitter.com/share?url=" + t + "/&text=Cifrar%20Online+",
    n = !0) : "facebook" === e && "share" === o ? (a = "https://www.facebook.com/sharer.php?u=" + t + "/",
    n = !0) : "googleplus" === e && "share" === o && (a = "https://plus.google.com/share?url=" + t + "/",
    n = !0),
    !0 === n && window.open(a, "rs", "width=500,height=400,scrollbars=NO")
}
function loadState() {
    var e, o, t, n, a;
    e = location.href,
    o = document.domain,
    "" === (n = e.split(o + "/"))[1] ? ($("#info").parent().parent().fadeOut("fast"),
    t = "aes",
    $("#halg").val(t)) : (-1 == (a = n[1].split("-"))[0].indexOf("/") && ("descifrar" === a[0] ? ($("#opc .scrollbtns").addClass("on"),
    setTimeout((function() {
        $("#opc .scrollbtns .tl").removeClass("disabled")
    }
    ), 100),
    setTimeout((function() {
        $("#opc .scrollbtns .tr").addClass("disabled")
    }
    ), 400),
    $("#form").attr("action", "javascript:decrypt();"),
    t = a[1]) : ($("#opc .scrollbtns").removeClass("on"),
    setTimeout((function() {
        $("#opc .scrollbtns .tr").removeClass("disabled")
    }
    ), 100),
    setTimeout((function() {
        $("#opc .scrollbtns .tl").addClass("disabled")
    }
    ), 400),
    $("#form").attr("action", "javascript:encrypt();"),
    t = a[0])),
    $("#halg").val(t),
    actinfo())}

    function loadSettings() {
        $("#" + $("#halg").val()).prop("checked", !0),
        $("#" + $("#hmode").val()).prop("checked", !0),
        $("#" + $("#hhash").val()).prop("checked", !0),
        $("#iv").val($("#hiv").val())
    }
    function loadSwipe() {
        canvas = document.getElementById("container"),
        eventSwipe(canvas)
    }
    function eventSwipe(e) {
        e.addEventListener("touchstart", (function(e) {
            if (1 == e.targetTouches.length) {
                var o = e.targetTouches[0];
                xIni = o.pageX,
                yIni = o.pageY
            }
        }
        ), !1),
        e.addEventListener("touchmove", (function(e) {
            if (1 == e.targetTouches.length) {
                var o = e.targetTouches[0];
                o.pageX > xIni + 100 && o.pageY > yIni - 33 && o.pageY < yIni + 33 && oa(0, "back", 2),
                o.pageX < xIni - 100 && o.pageY > yIni - 33 && o.pageY < yIni + 33 && oa(1, "goto", 2)
            }
        }
        ), !1)
    }
    function init() {
        $("#settings").addClass("hidden"),
        readoa(),
        loadSettings(),
        $("#settings").length && loadSwipe(),
        window.addEventListener("popstate", loadState, !1)
    }
    var data_alg = {
        aes: {
            name: "AES",
            iv: 16,
            block: 16,
            key: [16, 24, 32]
        },
        des: {
            name: "DES",
            iv: 8,
            block: 8,
            key: [8]
        },
        rijndael192: {
            name: "Rijndael 192",
            iv: 24,
            block: 24,
            key: [16, 24, 32]
        },
        rijndael256: {
            name: "Rijndael 256",
            iv: 32,
            block: 32,
            key: [16, 24, 32]
        },
        serpent: {
            name: "Serpent",
            iv: 16,
            block: 16,
            key: [16, 24, 32]
        },
        tripledes: {
            name: "TripleDES",
            iv: 8,
            block: 8,
            key: [24]
        },
        twofish: {
            name: "Twofish",
            iv: 16,
            block: 16,
            key: [16, 24, 32]
        },
        blowfish: {
            name: "Blowfish",
            iv: 8,
            block: 8,
            key: [56]
        },
        cast5: {
            name: "CAST5",
            iv: 8,
            block: 8,
            key: [16]
        },
        cast6: {
            name: "CAST6",
            iv: 16,
            block: 16,
            key: [16, 24, 32]
        },
        gost: {
            name: "GOST",
            iv: 8,
            block: 8,
            key: [32]
        },
        loki97: {
            name: "Loki97",
            iv: 16,
            block: 16,
            key: [16, 24, 32]
        },
        saferplus: {
            name: "Safer+",
            iv: 16,
            block: 16,
            key: [16, 24, 32]
        },
        xtea: {
            name: "XTEA",
            iv: 8,
            block: 8,
            key: [16]
        }
    }
      , Tools = {
        createCookie: function(e, o, t) {
            if (t) {
                var n = new Date;
                n.setTime(n.getTime() + 24 * t * 60 * 60 * 1e3);
                var a = "; expires=" + n.toGMTString()
            } else
                a = "";
            document.cookie = e + "=" + o + a + "; path=/; secure"
        },
        readCookie: function(e) {
            for (var o = e + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
                for (var a = t[n]; " " == a.charAt(0); )
                    a = a.substring(1, a.length);
                if (0 == a.indexOf(o))
                    return a.substring(o.length, a.length)
            }
            return null
        },
        eraseCookie: function(e) {
            Tools.createCookie(e, "", -1)
        }
    };
    $(document).ready((function() {
        init(),
        $(window).on("scroll", (function() {
            setal(1)
        }
        )),
        $(window).on("click", (function() {
            setal(2)
        }
        )),
        $(window).on("keydown", (function() {
            setal(3)
        }
        )),
        $("#secl").length && "sl" == window.a && createsl(),
        $("#lock").click((function() {
            $("#lock").hasClass("active") || ($("#lock").hasClass("on") ? ($("#lock").addClass("active"),
            setTimeout((function() {
                $("#lock").addClass("off"),
                $("#lock").removeClass("on"),
                $("#pass").prop("type", "text"),
                $("#pass").val(""),
                Tools.eraseCookie("lock"),
                setTimeout((function() {
                    $("#lock").removeClass("active")
                }
                ), 420)
            }
            ), 300)) : ($("#lock").addClass("active"),
            setTimeout((function() {
                $("#lock").addClass("on"),
                $("#lock").removeClass("off"),
                $("#pass").prop("type", "password"),
                Tools.createCookie("lock", "1", 365),
                setTimeout((function() {
                    $("#lock").removeClass("active")
                }
                ), 420)
            }
            ), 300)))
        }
        )),
        $("#pass").length && $("#lock").length && skey(),
        $("#opc .scrollbtns input").click((function() {
            return $(this).hasClass("disabled") ? ($("#opc .scrollbtns").hasClass("anim") || ($("#opc .scrollbtns").addClass("anim"),
            $("#opc .scrollbtns").hasClass("on") ? ($("#opc .scrollbtns").removeClass("on"),
            setTimeout((function() {
                $("#opc .scrollbtns .tr").removeClass("disabled")
            }
            ), 100),
            setTimeout((function() {
                $("#opc .scrollbtns .tl").addClass("disabled")
            }
            ), 400),
            $("#form").attr("action", "javascript:encrypt();")) : ($("#opc .scrollbtns").addClass("on"),
            setTimeout((function() {
                $("#opc .scrollbtns .tl").removeClass("disabled")
            }
            ), 100),
            setTimeout((function() {
                $("#opc .scrollbtns .tr").addClass("disabled")
            }
            ), 400),
            $("#form").attr("action", "javascript:decrypt();"))),
            setTimeout((function() {
                $("#opc .scrollbtns").removeClass("anim"),
                acturi()
            }
            ), 500),
            !1) : void 0
        }
        )),
        $("#cif").on("keyup", (function(e) {
            !e.ctrlKey || 10 != e.keyCode && 13 != e.keyCode || $("#form").submit()
        }
        )),
        $("#pass").on("change keydown keyup click", (function() {
            emptypass(1)
        }
        )),
        $("#ly").on("click", (function() {
            oa(1, "goto", 0)
        }
        )),
        $("#back").on("click", (function() {
            oa(0, "back", 0)
        }
        )),
        $(document).on("keydown", (function(e) {
            27 == e.which && oa(0, "back", 1)
        }
        )),
        $("#settings input[name=alg]").change((function() {
            setalg($(this).attr("id"))
        }
        )),
        $("#settings input[name=mode]").change((function() {
            var e = $(this).attr("id");
            $("#hmode").val(e),
            !0 === $("#pmode").prop("checked") && Tools.createCookie("mode", e, 365)
        }
        )),
        $("#iv").change((function() {
            var e = $(this).val();
            $("#hiv").val(e),
            !0 === $("#piv").prop("checked") && Tools.createCookie("iv", e, 365)
        }
        )),
        $("#settings input[name=hash]").change((function() {
            var e = $(this).attr("id");
            $("#hhash").val(e),
            !0 === $("#phash").prop("checked") && Tools.createCookie("hash", e, 365)
        }
        )),
        $("#rsiv").change((function() {
            !0 === $("#rsiv").prop("checked") ? ($("#hiiv").val("1"),
            !0 === $("#piv").prop("checked") && Tools.createCookie("iiv", hiiv, 365)) : ($("#hiiv").val("0"),
            !0 === $("#piv").prop("checked") && Tools.eraseCookie("iiv"))
        }
        )),
        $("#rand").click((function() {
            var e = srand(data_alg[$("#halg").val()].iv);
            $("#iv").val(e),
            $("#hiv").val(e),
            !0 === $("#piv").prop("checked") && Tools.createCookie("iv", e, 365)
        }
        )),
        $("#pmode").change((function() {
            if (!0 === $("#pmode").prop("checked")) {
                var e = $("input[name=mode]:checked").attr("id");
                null != e && "" != e && Tools.createCookie("mode", e, 365)
            } else
                Tools.eraseCookie("mode")
        }
        )),
        $("#piv").change((function() {
            if (!0 === $("#piv").prop("checked")) {
                var e = $("#iv").val();
                null != e && "" != e && Tools.createCookie("iv", e, 365),
                !0 === $("#rsiv").prop("checked") && Tools.createCookie("iiv", "1", 365)
            } else
                Tools.eraseCookie("iv"),
                Tools.eraseCookie("iiv")
        }
        )),
        $("#phash").change((function() {
            if (!0 === $("#phash").prop("checked")) {
                var e = $("input[name=hash]:checked").attr("id");
                null != e && "" != e && Tools.createCookie("hash", e, 365)
            } else
                Tools.eraseCookie("hash")
        }
        )),
        $("#settings input[type=submit]").click((function() {
            return setalg($("#settings input[name=alg]:checked").attr("id")),
            $("#hmode").val($("#settings input[name=mode]:checked").attr("id")),
            $("#hiv").val($("#iv").val()),
            oa(0, "save", 0),
            !1
        }
        )),
        $("#slinfo").length && ($("#slinfo").on("click", ttiptext),
        ttipicon()),
        $("#pass").on("focus", (function() {}
        )),
        $("#iv").on("focus", (function() {}
        )),
        $(".help").on("click", (function() {}
        )),
        $("#pubcode").on("mouseenter click focus", (function() {
            $("#pubcode").select()
        }
        )),
        $("#pvtcode").on("mouseenter click focus", (function() {
            $("#pvtcode").select()
        }
        )),
        $("#delcode").on("mouseenter click focus", (function() {
            $("#delcode").select()
        }
        )),
        $("#pubcode").on("keypress", (function() {
            return !1
        }
        )),
        $("#pvtcode").on("keypress", (function() {
            return !1
        }
        )),
        $("#delcode").on("keypress", (function() {
            return !1
        }
        )),
        $("#pubcode").on("change", (function() {
            $("#pubcode").val($("#publink").data("href"))
        }
        )),
        $("#pvtcode").on("change", (function() {
            $("#pvtcode").val($("#pvtlink").data("href"))
        }
        )),
        $("#delcode").on("change", (function() {
            $("#delcode").val($("#dellink").data("code"))
        }
        )),
        $("#publink").on("click", (function() {
            linkven($("#publink").data("href"))
        }
        )),
        $("#pvtlink").on("click", (function() {
            linkven($("#pvtlink").data("href"))
        }
        )),
        $("#dellink").on("click", (function() {
            $(this).hasClass("r") ? delsl($("#dellink").data("id"), $("#dellink").data("code")) : $("#dellink").addClass("r")
        }
        )),
        $("#fgtlink").on("click", (function() {
            fgtsl()
        }
        )),
        $("#ttdel").on("click", (function() {
            showdelsl()
        }
        )),
        $("#ttnew").on("click", (function() {
            $('<form action="/" method="POST"><input type="hidden" name="a" value="sl"></form>').submit()
        }
        )),
        $("#dcode").on("keypress change", (function() {
            $("#delsl form.alert").removeClass("alert")
        }
        ))
    }
    ));
    