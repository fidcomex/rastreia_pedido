import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from "../status/status.component";

@Component({
  selector: 'app-card-pedido',
  standalone: true,
  imports: [CommonModule, StatusComponent], // Adicionando CommonModule
  templateUrl: './card-pedido.component.html',
  styleUrl: './card-pedido.component.css'
})
export class CardPedidoComponent { 
  @Input() pedido: any; // Permite receber um único pedido via Input()

 transportadoras = [
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/3288.png', name: 'jadlog'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/19785.png', name: 'favorita'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/18812.png', name: 'front'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/19158.png', name: 'dominalog'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/18587.png', name: 'brasil web'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/572.png', name: 'jamef'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/1419.png', name: 'luz'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/18584.png', name: 'mma'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/10848.png', name: 'pajuçara'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/112.png', name: 'movvi'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/17813.png', name: 'rvr'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/16855.png', name: 'convencional'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/4.png', name: 'total'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/2.png', name: 'sedex'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/15817.png', name: 'translog'},
 ]


  getUniqueStatus(historyArray: any[]): any[] {
    const seen = new Set();
    return historyArray.filter(item => {
      if (!seen.has(item.shipment_order_volume_state_localized)) {
        seen.add(item.shipment_order_volume_state_localized);
        return true;
      }
      return false;
    });
  }

  getTransportadoraLogo(): string {
    const deliveryName = this.pedido?.trackingInfo?.content?.delivery_method_name?.toLowerCase();
    
    if (!deliveryName) return 'URL_PADRAO_AQUI'; 
  
    const transportadora = this.transportadoras.find(t =>
      deliveryName.includes(t.name.toLowerCase()) // Verifica se o nome da transportadora está contido
    );
  
    return transportadora ? transportadora.icon : 'URL_PADRAO_AQUI';
  }
  
  isValidDate(dateString: string | null | undefined): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  formatDate(dateString: string, portal: string): string {
    if (!dateString) return '';
  
    let date = new Date(dateString);
  
    if (isNaN(date.getTime())) return ''; // Verifica se é uma data válida
    // Se for da Leroy, só muda o formato para 'dd/MM/yyyy'
    if (portal === 'Leroy Merlin') {

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    // Para outros portais, retorna ISO normal
    return date.toISOString();
  }
  
  
  
  
}
