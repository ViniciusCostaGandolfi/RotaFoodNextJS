import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateShipment from '@/app/shared/logistics/shipment/create';
import { Button } from '@/components/ui/button';
import { PiUploadSimple } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Edit Shipment',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.logistics.shipmentList,
      name: 'Shipments',
    },
    {
      name: 'Edit Shipment',
    },
  ],
};

const shipmentData = {
  agency: 'pixelperfect',
  country: 'US',
  courierCompany: 'fedex',
  deliveryTime: 'next_day',
  notifySenderViaSMS: true,
  notifyRecipientViaSMS: true,
  officeOrigin: 'NY-NY/USA',
  paidBy: 'Sender',
  paymentMethod: 'credit_card',
  packagingType: 'carton',
  paymentType: 'payNow',
  payeeName: 'Nicolas Dover',
  payeeCountry: 'US',
  payeeCity: 'Dallas',
  payeeStreetAddress: '3607 Oakridge Lane',
  packageAmount: '4500',
  packageWidth: '123',
  packageHeight: '321',
  packageLength: '456',
  packageWeight: '654',
  recipientName: 'Salvador Patton',
  recipientAddress: '4266 Primrose Lane, Madison, Wisconsin, 53703',
  recipientEmail: 'salvoor@gmail.com',
  recipientPhone: '+13478903219',
  shippingMethod: 'express',
  shippingInfoAttachment: '',
  senderName: 'Rylee Wheeler',
  senderAddress: '4348 Tuna Street, Columbiaville, Michigan, 48421',
  senderEmail: 'ryleewheeler@gmail.com',
  senderPhone: '+13478901234',
};

export const metadata: Metadata = {
  title: 'Edit Shipment | Isomorphic Furyroad',
};

export default function EditShipmentsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Import File'} />
      </PageHeader>

      <CreateShipment id={params.id} shipment={shipmentData} />
    </>
  );
}
