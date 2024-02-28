import { DownloadCloud, Trash2 } from 'lucide-react';
import { ActivityType } from '@/types';
import dayjs from 'dayjs';

type ActivitiesItemProps = {
  name: string;
  type: ActivityType;
  date: string;
  civitaiUrl?: string;
};

export function ActivitiesItem({
  name,
  type,
  date,
  civitaiUrl,
}: ActivitiesItemProps) {
  return (
    <div>
      <p className="text-xs text-[#909296]">
        {dayjs(date).format('YYYY-MM-DD')}
      </p>
      <div className="flex space-x-2 items-center mt-2">
        {type === ActivityType.Downloaded ? (
          <DownloadCloud size={20} />
        ) : (
          <Trash2 size={20} />
        )}
        <a href={civitaiUrl} target="_blank">
          <p className="text-sm capitalize">
            {type} <b>{name}</b>
          </p>
        </a>
      </div>
    </div>
  );
}
