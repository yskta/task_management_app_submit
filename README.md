# layerX_Internship_submit
# タスク管理アプリケーション
## 環境構築

### PostgreSQLのセットアップ (Docker)
1. Dockerコンテナの起動
`docker-compose up -d`
2. コンテナの起動確認
`docker ps`
3. コンテナ内のPostgreSQLに接続
`docker exec -it task-management-db psql -U postgres -d taskdb`
- `\dt`：テーブル一覧表示
- `\d "User"`: 特定のテーブルの詳細な構造確認

### マイグレーション実行
- `cd backend && npx prisma migrate dev --name init`

### サーバーサイド起動
- `cd backend && npm run dev`