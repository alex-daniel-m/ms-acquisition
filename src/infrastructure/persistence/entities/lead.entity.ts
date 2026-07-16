import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity('leads')
@Index(['site_id', 'created_at'])
@Index(['site_id', 'updated_at'])
@Index(['fingerprint', 'ip'])
@Index('IDX_leads_only_pending', ['status'], { where: `"status" = 'PENDING'` })
export class LeadEntity {

  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  x_correlation_id!: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'visit | lead | api'
  })
  type!: string;

  @Column({
    type: 'varchar',
    length: 64,
    comment: 'sha256'
  })
  site_id!: string;

  @Column('uuid')
  session_id!: string;

  @Column({
    type: 'jsonb',
    default: {}
  })
  tracking!: Record<string, any>;

  @Column({
    type: 'jsonb'
  })
  context!: Record<string, any>;

  @Column({
    type: 'jsonb',
    default: {}
  })
  niche_data!: Record<string, any>;

  @Column({
    type: 'text',
    name: 'user_agent',
    default: ''
  })
  user_agent!: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  host!: string;

  @Column({
    type: 'text',
    default: ''
  })
  language!: string;

  @Column({
    type: 'text',
    default: ''
  })
  referrer!: string;

  @Column('inet')
  ip!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '',
    comment: 'http/https'
  })
  protocol!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'x_original_host',
    default: ''
  })
  x_original_host!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'UNKNOWN',
    comment: 'GET | POST | PUT | DEL'
  })
  method!: string;

  @Column({
    type: 'varchar',
    length: 64,
    comment: 'sha256'
  })
  fingerprint!: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'v1'
  })
  api_version!: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'PENDING | VISIT | API | UNKNOWN'
  })
  status!: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at!: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at!: Date;
}