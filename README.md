# タスク管理アプリケーション

## 技術スタック
### バックエンド
- Node.js + Express.js
- TypeScript
- Prisma (ORM)
- PostgreSQL
- JWT認証
### フロントエンド
- React
- TypeScript
- React Query
- React Hook Form
- Axios

## セットアップ

### 環境構築
1. リポジトリのクローン
```
git clone git@github.com:yskta/layerX_Internship_submit.git
```
2. データベースの起動
```
docker-compose up -d
```
3. バックエンドの起動
```
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```
4. フロントエンドの起動
```
cd frontend
npm install
npm start
```

###補足
- コンテナの起動確認
```
docker ps
```
- コンテナ内のデータベースに接続
`docker exec -it task-management-db psql -U postgres -d taskdb`
- `\dt`：テーブル一覧表示
- `\d "User"`: 特定のテーブルの詳細な構造確認
- `SELECT * FROM "User";` SQLを実行