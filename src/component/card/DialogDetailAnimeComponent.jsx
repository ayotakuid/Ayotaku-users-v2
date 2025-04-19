import { Dialog } from 'primereact/dialog';
import { useDialog } from '../utils/DialogContext';
import { Tailwind } from '../../utils/handler-template-dialog';

function DialogDetailAnimeComponent() {
  const { visible, hideDialog } = useDialog();

  return (
    <Dialog
      header="Detail Anime"
      visible={visible}
      onHide={hideDialog}
      position="top"
      style={{ width: '50vw', marginTop: '5rem' }}
      draggable={false}
      resizable={false}
      className='bg-ayotaku-dark'
      pt={Tailwind.dialog}
    >
      <p className="m-0">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero corrupti quasi laborum, illo ipsam eaque reiciendis nostrum consequuntur a culpa, consequatur necessitatibus incidunt modi adipisci dolores suscipit ea eos quod?
      </p>
    </Dialog>
  );
}

export default DialogDetailAnimeComponent;
