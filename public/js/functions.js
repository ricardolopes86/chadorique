$("#rn_minus").on("click", function() {
  numero_rn_atual = $("#numero_rn").text();
  if (numero_rn_atual > 0) {
    $("#numero_rn").text(parseInt(numero_rn_atual) - 1);
    $('input[name=rn_mais]').val(parseInt(numero_rn_atual) - 1);
  } else {
    console.log(numero_rn_atual);
  }
});

$("#p_minus").on("click", function() {
  numero_p_atual = $("#numero_p").text();
  if (numero_p_atual > 0) {
    $("#numero_p").text(parseInt(numero_p_atual) - 1);
    $('input[name=fraldas_p]').val(parseInt(numero_p_atual) - 1);
  } else {
    console.log(numero_p_atual);
  }
});

$("#m_minus").on("click", function() {
  numero_m_atual = $("#numero_m").text();
  if (numero_m_atual > 0) {
    $("#numero_m").text(parseInt(numero_m_atual) - 1);
    $('input[name=fraldas_m]').val(parseInt(numero_m_atual) - 1);
  } else {
    console.log(numero_m_atual);
  }
});

$("#rn_mais").on("click", function() {
  numero_rn_atual = $("#numero_rn").text();
  if (numero_rn_atual >= 0) {
    $("#numero_rn").text(parseInt(numero_rn_atual) + 1);
    $('input[name=rn_mais]').val(parseInt(numero_rn_atual) + 1);
  } else {
    console.log(numero_rn_atual);
  }
});

$("#p_mais").on("click", function() {
  numero_p_atual = $("#numero_p").text();
  if (numero_p_atual >= 0) {
    $("#numero_p").text(parseInt(numero_p_atual) + 1);
    $('input[name=fraldas_p]').val(parseInt(numero_p_atual) + 1);
  } else {
    console.log(numero_p_atual);
  }
});

$("#m_mais").on("click", function() {
  numero_m_atual = $("#numero_m").text();
  if (numero_m_atual >= 0) {
    $("#numero_m").text(parseInt(numero_m_atual) + 1);
    $('input[name=fraldas_m]').val(parseInt(numero_m_atual) + 1);
  } else {
    console.log(numero_m_atual);
  }
});

$("#salvar").click(function () {
    $("form").submit();
    alert("Obrigado pelas informações!");
});
