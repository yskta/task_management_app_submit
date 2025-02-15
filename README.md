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
2. 環境変数のファイルを追加
- cd backend && touch .env で以下を追記
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb?schema=public"
JWT_SECRET="long-secret-key"
PORT=8080
```
- cd frontend && touch .env で以下を追記
```
REACT_APP_API_URL=http://localhost:8080
```

3. バックエンドの起動
```
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```
4. フロントエンドの起動
```
cd frontend
npm install
npm start
```
5. フロントからログインする場合
### User1
- メールアドレス:user1@example.com
- パスワード:password
### User2
- メールアドレス:user2@example.com
- パスワード:password
### その他
サインアップ機能でユーザー追加可能

### 補足
- コンテナの起動確認
```
docker ps
```
- コンテナ内のデータベースに接続
`docker exec -it task-management-db psql -U postgres -d taskdb`
- `\dt`：テーブル一覧表示
- `\d "User"`: 特定のテーブルの詳細な構造確認
- `SELECT * FROM "User";` SQLを実行

## APIのドキュメント
起動後、以下にアクセスするとAPIの仕様を確認できます。
```
http://localhost:8080/api-docs/
```