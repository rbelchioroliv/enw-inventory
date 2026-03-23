import ExcelJS from 'exceljs';

export async function exportToExcel(equipamentos: any[]) {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventário TI');

  
  worksheet.columns = [
    { header: 'Patrimônio', key: 'patrimonio', width: 15 },
    { header: 'S/N', key: 'numeroSerie', width: 22 },
    { header: 'MAC Address', key: 'macAddress', width: 20 },
    { header: 'Empresa', key: 'empresa', width: 15 },
    { header: 'Modelo', key: 'modelo', width: 25 },
    { header: 'Usuário', key: 'usuario', width: 25 },
    { header: 'E-mail', key: 'email', width: 30 },
    { header: 'Idade (Anos)', key: 'idade', width: 15 },
    { header: 'Nº Reparos', key: 'reparos', width: 15 },
    { header: 'Status', key: 'status', width: 22 },
    { header: 'Configurações Técnicas', key: 'configuracoes', width: 60 },
    { header: 'Data de Cadastro', key: 'criadoEm', width: 20 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD4AF37' }, 
    };
    cell.font = { bold: true, color: { argb: 'FF0A0A0A' }, size: 12 };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' }, left: { style: 'thin' },
      bottom: { style: 'thin' }, right: { style: 'thin' }
    };
  });

  
  equipamentos.forEach((eq) => {
    const row = worksheet.addRow({
      patrimonio: eq.patrimonio,
      numeroSerie: eq.numeroSerie || 'N/A',
      macAddress: eq.macAddress,
      empresa: eq.empresa,
      modelo: eq.modelo,
      usuario: eq.usuarioAtual,
      email: eq.emailCorporativo,
      idade: eq.idadeHardware,
      reparos: eq.numeroReparos,
      status: eq.alertaTroca ? '⚠️ TROCA RECOMENDADA' : '✔️ OK',
      configuracoes: eq.configuracoes,
      criadoEm: new Date(eq.criadoEm).toLocaleDateString('pt-BR'),
    });

   
    row.alignment = { vertical: 'middle' };
    row.getCell('idade').alignment = { horizontal: 'center' };
    row.getCell('reparos').alignment = { horizontal: 'center' };
    
    
    const statusCell = row.getCell('status');
    statusCell.font = {
      color: { argb: eq.alertaTroca ? 'FFDC2626' : 'FF16A34A' }, 
      bold: true
    };
    statusCell.alignment = { horizontal: 'center' };
  });

  
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  
  
  const dateStr = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `Inventario_ENW_${dateStr}.xlsx`;
  document.body.appendChild(a);
  a.click();
  
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}